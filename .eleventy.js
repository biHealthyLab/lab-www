// const pluginDate = require("eleventy-plugin-date");
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

module.exports = function(eleventyConfig) {
    eleventyConfig.setLibrary("md", markdownLib);
    // eleventyConfig.addPlugin(pluginDate);
    // eleventyConfig.addPlugin(mathjaxPlugin);
    
    // latex filter for katex 
    eleventyConfig.addFilter("latex", (content) => {
        return content.replace(/\$\$(.+?)\$\$/g, (_, equation) => {
          const cleanEquation = equation.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      
          return katex.renderToString(cleanEquation, { throwOnError: false });
        });
      });


    eleventyConfig.addPassthroughCopy("src/assets/css/");
    eleventyConfig.addPassthroughCopy("src/assets/lib/");
    eleventyConfig.addPassthroughCopy("src/assets/js/");
    eleventyConfig.addPassthroughCopy("src/assets/img/");
    eleventyConfig.addPassthroughCopy("src/media/images/");

    
    // Shortcodes
    eleventyConfig.addShortcode("ItemCard", ItemCard);


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