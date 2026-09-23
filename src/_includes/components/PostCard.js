const {html} = require("common-tags");

function PostCard({featuredImg, postTitle, postAuthor, postTeaser, postDate, postLink}) {
    return html`
    <a class="post_card post-card-link card-body d-block" href="${postLink}">
        <div class="figure">
            <img src="${featuredImg}" alt="Illustration for ${postTitle}" loading="lazy" decoding="async">
        </div>
        <div class="p-3">
            <h6 class="mb-3">${postTitle}</h6>
            <span><small class="text-muted">By ${postAuthor} - ${postDate}</small></span> <br>
            <span>${postTeaser}</span>
        </div>
    
    </a>
    `;
}

module.exports = PostCard;
