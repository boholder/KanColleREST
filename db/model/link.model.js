/*
URL for detail information about ships, creators...
 */
class LinkModel {
    constructor({name, url} = {}) {
        this.name = name || '';
        this.url = url || '';
    }

    static build(link = {}) {
        return new LinkModel(link);
    }

    static buildLinkArray(linkArray = []) {
        let array = [];
        for (let link of linkArray) {
            array.push(LinkModel.build(link));
        }
        return array;
    }
}

export {LinkModel}