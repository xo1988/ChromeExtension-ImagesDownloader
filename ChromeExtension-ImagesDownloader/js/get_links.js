// 根据Xpath获取元素
function getElementsByXpath(sXPath) {
    var oEvaluator = new XPathEvaluator();
    var oResult = oEvaluator.evaluate(sXPath, document, null,
        XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var aNodes = new Array();
    if (oResult != null) {
        var oElement = oResult.iterateNext();
        while (oElement) {
            aNodes.push(oElement);
            oElement = oResult.iterateNext();
        }
    }
    aNodes = aNodes.map(function(element) {
        return element;
    })
    return aNodes;
};

// 根据Xpath获取元素Src属性
function getElementsSrcByXpath(sXPath) {
    var oEvaluator = new XPathEvaluator();
    var oResult = oEvaluator.evaluate(sXPath, document, null,
        XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var aNodes = new Array();
    if (oResult != null) {
        var oElement = oResult.iterateNext();
        while (oElement) {
            aNodes.push(oElement);
            oElement = oResult.iterateNext();
        }
    }
    aNodes = aNodes.map(function(element) {
        return element.currentSrc;
    })
    return aNodes;
};

// 获取元素的Xpath
function getXpathOfElement(element) {
    if (element.id!=='')
        return "//*[@id='"+element.id+"']";
    
    if (element===document.body)
        return element.tagName.toLowerCase();

    var ix= 0;
    var siblings= element.parentNode.childNodes;
    for (var i= 0; i<siblings.length; i++) {
        var sibling= siblings[i];
        
        if (sibling===element) return getXpathOfElement(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
        
        if (sibling.nodeType===1 && sibling.tagName === element.tagName) {
            ix++;
        }
    }
}

// 获取图片链接
var links = null;
if ( mode == 'xpath') {
    var elements = getElementsByXpath("//img");
    var targetElement = null;
    for (var index in elements) {
        if ( elements[index].currentSrc == img_uri) {
            targetElement = elements[index]
            break;
        }
    }
    if (targetElement) {
        var xpath = getXpathOfElement(targetElement);
        xpath = xpath.replace(/\[[1-9]*\]/g,'')
        console.log(xpath)
        links = {
            "data":getElementsSrcByXpath(xpath)
        }
    }
} else {
    var elements = getElementsByXpath("//img");
    var data = []
    for (var index in elements) {
        data.push(elements[index].currentSrc)
    }
    links = {
        "data":data
    }
}

console.log('finished')
chrome.extension.sendRequest(links);
