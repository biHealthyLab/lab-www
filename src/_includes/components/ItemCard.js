const {html} = require("common-tags");

function ItemCard({cardImageUrl, cardTitle, cardText, cardLink, linkText}) {
    return html`
    <div class="topics-item rounded p-4">
    <div class="figure">
        <img src="${cardImageUrl}"></img>
    </div>
    <div class="p-3">
        <h5 class="mb-3">${cardTitle}</h5>
        <span>${cardText}</span>
        <p><a href="${cardLink}">${linkText}</a></p>
    </div>
    
</div>
    `;
}

module.exports = ItemCard;