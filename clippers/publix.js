// Load all the coupons
let buttons = window.document.querySelectorAll('button.text-link');
for (let button of buttons) {
    if (button.textContent.trim() === 'Show all') {
        button.click();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function clip() {
    let coupons = window.document.querySelectorAll('button.loading-button.tertiary');
    console.log(`Detected ${coupons.length} possible coupons.`);
    for (let coupon of coupons) {
        await sleep(10);
        coupon.click();
    }
}

// wait for page to finish loading :/
async function main() {
    await sleep(5000);
    clip();
}
