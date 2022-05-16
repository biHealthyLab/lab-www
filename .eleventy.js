// const pluginDate = require("eleventy-plugin-date");
// const mathjaxPlugin = require("eleventy-plugin-mathjax");
// const katex = require("katex");

module.exports = function(eleventyConfig) {
    // eleventyConfig.addPlugin(pluginDate);
    // eleventyConfig.addPlugin(mathjaxPlugin);
    eleventyConfig.addPassthroughCopy("src/assets/css/");
    eleventyConfig.addPassthroughCopy("src/assets/lib/");
    eleventyConfig.addPassthroughCopy("src/assets/js/");
    eleventyConfig.addPassthroughCopy("src/assets/img/");
    eleventyConfig.addPassthroughCopy("src/media/images/");

    


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