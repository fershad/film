export default async function(eleventyConfig) {
    eleventyConfig.setInputDirectory("src");
	eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
    
};