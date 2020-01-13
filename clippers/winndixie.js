// Continuously scroll down to load all coupons.
let stopID = setInterval(() => window.scrollTo(0,document.body.scrollHeight), 10);

function clip() {
    let coupons = window.document.querySelectorAll('.pod.ci-grid:not(.activated)')
    if (coupons.length === 0) {
        console.log("No coupons to clip :(")
        return 0;
    }

    for (let coupon of coupons) {
        let summary = coupon.querySelector('.pod_summary').textContent;
        let description = coupon.querySelector('.pod_description').textContent;
        let button = coupon.querySelector('.add-text');
        button.click();
        console.log(`Clipped coupon for "${summary} ${description}"!`);
    }

    return coupons.length;
}

// Give coupons 5 seconds to load. 
setTimeout(() => {
    clearInterval(stopID);
    let clipped = clip();
    window.scrollTo(0, 0);
    setTimeout(() => alert(`Clipped ${clipped} coupons!`), 10);
}, 5000);