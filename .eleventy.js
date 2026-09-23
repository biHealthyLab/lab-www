const pluginDate = require("eleventy-plugin-date");
const markdownIt =require("markdown-it");

const options = {
  html: true,
  breaks: false,
  linkify: true
};

const markdownLib = markdownIt(options);

// Components 
const ItemCard = require("./src/_includes/components/ItemCard");
const PostCard = require("./src/_includes/components/PostCard");

// Filters 
const getSimilarTopics = function(topicA, topicB){
  return topicA.filter(Set.prototype.has, new Set(topicB)).length;
}

// Sorting by order
function sortByOrder(values) {
  let vals = [...values];     // this *seems* to prevent collection mutation...
  return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
}

function sortByCategory(values) {
  let vals = [...values];     // this *seems* to prevent collection mutation...
  return vals.sort((a, b) => Math.sign(a.data.category - b.data.category));
}

function eventTimestamp(event) {
  return new Date(event.data.date).getTime();
}

function publicationYears(publications) {
  return [...new Set(publications.map((publication) => publication.year))]
    .sort((a, b) => Number(b) - Number(a));
}

function publicationsForYear(publications, year) {
  return publications.filter((publication) => String(publication.year) === String(year));
}

function publishedPublications(publications) {
  return publications.filter((publication) => publication.type !== "preprint");
}

function preprintPublications(publications) {
  return publications
    .filter((publication) => publication.type === "preprint")
    .sort((a, b) => new Date(b.releaseDate || `${b.year}-01-01`) - new Date(a.releaseDate || `${a.year}-01-01`));
}

function readablePublicationDate(value) {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}


module.exports = function(eleventyConfig) {
    eleventyConfig.setLibrary("md", markdownLib);
    eleventyConfig.addPlugin(pluginDate);
    // Sorting
    eleventyConfig.addFilter("sortByOrder", sortByOrder);
    eleventyConfig.addFilter("sortByCategory", sortByCategory);
    eleventyConfig.addFilter("publicationYears", publicationYears);
    eleventyConfig.addFilter("publicationsForYear", publicationsForYear);
    eleventyConfig.addFilter("publishedPublications", publishedPublications);
    eleventyConfig.addFilter("preprintPublications", preprintPublications);
    eleventyConfig.addFilter("readablePublicationDate", readablePublicationDate);
    eleventyConfig.addFilter("isoDate", (value) => {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
    });
    eleventyConfig.addFilter("webpPath", (value) => {
      return typeof value === "string" ? value.replace(/\.[^/.]+$/, ".webp") : value;
    });
    eleventyConfig.addFilter("futureEvents", (values) => {
      const now = Date.now();
      return [...values]
        .filter((event) => eventTimestamp(event) >= now)
        .sort((a, b) => eventTimestamp(a) - eventTimestamp(b));
    });
    eleventyConfig.addFilter("pastEvents", (values) => {
      const now = Date.now();
      return [...values]
        .filter((event) => eventTimestamp(event) < now)
        .sort((a, b) => eventTimestamp(b) - eventTimestamp(a));
    });



    eleventyConfig.addPassthroughCopy("src/assets/css/");
    eleventyConfig.addPassthroughCopy("src/assets/lib/");
    eleventyConfig.addPassthroughCopy("src/assets/js/");
    eleventyConfig.addPassthroughCopy("src/assets/img/");
    eleventyConfig.addPassthroughCopy("src/media/images/");
    eleventyConfig.addPassthroughCopy("src/media/files/");


    
    // Shortcodes
    eleventyConfig.addShortcode("ItemCard", ItemCard);
    eleventyConfig.addShortcode("PostCard", PostCard);

    // Filter configs 
    eleventyConfig.addNunjucksFilter("similarTopics", function(collection, path, topics){
      return collection.filter((post) => {
        return getSimilarTopics(post.data.topics, topics) >= 1 && post.data.page.inputPath !== path;
      }).sort((a,b) => {
        return getSimilarTopics(b.data.topics, topics) - getSimilarTopics(a.data.topics, topics);
      });
    });



    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: '_site',
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
    };
}
