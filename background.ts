export {}

chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...")
  chrome.contextMenus.create({
    id: "copy-title-and-url",
    title: "Copy title and URL",
    contexts: ["all"]
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copy-title-and-url") {
    const title = tab.title
    const url = tab.url
    const text = `${title}\n${url}`
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [text],
      func: (text) => {
        const textarea = document.createElement("textarea")
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }
    })
  }
})
