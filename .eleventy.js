const pluginDate = require("eleventy-plugin-date");
const markdownIt =require("markdown-it");
const markdownItKatex = require("markdown-it-katex");
const katex = require("katex");

const options = {
  html: true,
  breaks: false,
  linkify: true
};

const markdownLib = markdownIt(options).use(markdownItKatex);

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


module.exports = function(eleventyConfig) {
    eleventyConfig.setLibrary("md", markdownLib);
    eleventyConfig.addPlugin(pluginDate);
    // eleventyConfig.addPlugin(mathjaxPlugin);
    
    // latex filter for katex 
    eleventyConfig.addFilter("latex", (content) => {
        return content.replace(/\$\$(.+?)\$\$/g, (_, equation) => {
          const cleanEquation = equation.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      
          return katex.renderToString(cleanEquation, { throwOnError: false });
        });
      });

    // Sorting
    eleventyConfig.addFilter("sortByOrder", sortByOrder);
    eleventyConfig.addFilter("sortByCategory", sortByCategory);



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