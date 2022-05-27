const {html} = require("common-tags");

function PostCard({featuredImg, postTitle, postAuthor, postTeaser, postDate, postLink, linkText}) {
    return html`
    <div class="post_card card-body" onclick="window.location.href='${postLink}'">
        <div class="figure">
            <img src="${featuredImg}"></img>
        </div>
        <div class="p-3">
            <h6 class="mb-3">${postTitle}</h6>
            <span><small class="text-muted">By ${postAuthor} - ${postDate}</small></span> <br>
            <span>${postTeaser}</span>
            <p><a href="${postLink}">${linkText}</a></p>
        </div>
    
    </div>
    `;
}

module.exports = PostCard;