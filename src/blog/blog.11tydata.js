export default {
    eleventyComputed: {
        permalink: (data) => (data.hidden ? false : data.permalink),
        eleventyExcludeFromCollections: (data) =>
            data.hidden ? true : data.eleventyExcludeFromCollections ?? false
    }
};
