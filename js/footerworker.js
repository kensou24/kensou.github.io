import logger from "./logger.js";
import Worker from "./worker.js";

class FooterWorker extends Worker {
    constructor() {
        super();
    }

    register(p_viki) {
        super.register(p_viki);
        logger.log("register FooterWorker");
    }

    run() {
        if (this.viki.info.naviFile || this.viki.info.toc) {
            return;
        }

        let footer = $(`<footer class="viki-footer text-muted"></footer>`);
        let container = $(`<div class="container-fluid p-3 p-md-5"></div>`);

        if (this.viki.config.footer) {
            let rowP = $(`<p class="viki-footer-row">${this.viki.config.footer}</p>`);
            container.append(rowP);
        }

        /* ATTENTION: As an additional aggrement to the license, removing or hiding
           the following footer is not allowed.
         */
        let vikiFooter = `Generated by <em><a href="https://vnotex.github.io/viki/">Viki</a></em>.`;
        let vikiP = $(`<p class="viki-footer-row viki-footer-viki">${vikiFooter}</p>`);
        container.append(vikiP);

        footer.append(container);
        $("body").append(footer);

        this.viki.scheduleNext();
    }
}

export default FooterWorker;
