function createItem(ArgName, ArgDesc, ArgDate, ArgTags) {
    let name = ArgName || "Name";
    let desc = ArgDesc;
    let date = ArgDate || "03/05/2004";
    let tags = ArgTags || ["Template",];
    let isComplate = false;
    function setName(newName) {
        name = newName;
    }
    function getName() {
        return name;
    }
    function setDesc(newDesc) {
        desc = newDesc;
    }
    function getDesc() {
        return desc;
    }
    function setDate(newDate) {
        date = newDate;
    }
    function getDate() {
        return date;
    }
    function addTag(newTag) {
        tags.push(newTag);
    }
    function removeTag(givenTag) {
        if (tags.includes(givenTag)) {
            tags.splice(indexOf(givenTag), 1);
            return true;
        }
        return false;
    }
    function hasTag(givenTag) {
        if (tags.includes(givenTag)) {
            return true;
        }
        return false;
    }
    function getTags() {
        return this.tags;
    }
    function getTagString() {
        let outputStr = "";
        for (let i = 0; i < tags.length; i++){
            outputStr+=tags[i]+" ";
        }
        return outputStr;
    }

    function toCSV(){
        return `${getName()},${getDate()},"${getDesc()}",{${getTagString()}}`;
    }
    // Function to mark complete
    // Function to mark incomplete
    return { setName, getName, setDesc, getDesc, setDate, getDate, addTag, removeTag, hasTag, getTags, getTagString, toCSV};
}
// IIFE that instantiates the list
const itemArrayCTRL = (function () {
    const itemArray = [];

    function addItem(ArgName, ArgDesc, ArgDate, ArgTags) {
        const newItem = createItem(ArgName, ArgDesc, ArgDate, ArgTags);
        let i = 0;
        const tempName = ArgName;
        while (itemArray.some(item => item.getName() === ArgName)) {
            i++;
            ArgName = tempName + i;
        }
        newItem.setName(ArgName);
        itemArray.push(newItem);
        return newItem;
    }

    function removeItem(itemName) {
        for (let item of itemArray) {
            if (item.getName() === itemName) {
                itemArray.splice(itemArray.indexOf(item), 1);
                break;
            }
        }
    }
    function getItems() {
        return itemArray;
    }
    function getItem(i) {
        return itemArray[i];
    }
    function tagSort(){
        return getItem();
    }

    function tagSort(givenTag) {
        const returnArr = [];
        for (let item of itemArray) {
            if (item.hasTag(givenTag)) {
                returnArr.push(item);
            }
        }
        return returnArr;
    }
    return { addItem, removeItem, getItems, getItem, tagSort };

})();

export { itemArrayCTRL, createItem };