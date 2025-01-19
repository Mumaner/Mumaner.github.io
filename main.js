// 获取标题和预览内容
// fetch("output/posts/post.html")
// .then(Response => Response.text())//将响应转化为文本格式即html格式
// .then(html=>{
//     const doc = new DOMParser().parseFromString(html, 'text/html');
//     const title= doc.title;
//     document.getElementById("post-title").textContent = title;//将标题内容赋值给 index.html 中 id 为 post-title 的元素的文本内容
//     const content = doc.body.textContent|| '';//|| '' 是 JavaScript 中的一种 默认值处理 的写法，它的作用是：如果 doc.body.textContent 的值为 null 或 undefined，则使用空字符串 '' 作为默认值。
//     const truncatedContent = content.slice(0,200);
//     document.getElementById("post-truncatedcontent").textContent = truncatedContent+"…………";
// })
// .catch(error=>{
//     console.error("加载 output/post.html 失败：",error);
//     document.getElementById('post-title').textContent = '加载失败，请检查文件路径。';
//     document.getElementById('post-content').textContent = '';
// });

async function loadPosts() {
    try{
        // 获取文件列表
        const response = await fetch('output/index.json');
        const files = await response.json();
        const postList= document.getElementById('post-list');//它只是把index.html中的post-list元素给声明为postList
        const postTitleList= document.getElementById('post-title-list');//它只是把index.html中的post-list元素给声明为postList
        // 遍历文件列表
        for(const file of files){//遍历
            const postResponse = await fetch(`output/posts/${file}`);
            const html = await postResponse.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const title= doc.title;
            const content = doc.body.textContent|| '';
            const truncatedContent = content.slice(0,200);
            // 创建文章卡片
            const postDiv=document.createElement("div");
            postDiv.className="post";
            postDiv.innerHTML=`
                <h3>${title}</h3>
                <p>内容：${truncatedContent}...</p>
                <a href="output/posts/${file}">阅读更多</a>
                `; 
            postList.appendChild(postDiv);
            //创建标题卡片
            const postTitleDiv=document.createElement("div");
            postTitleDiv.className="post-title-list";
            postTitleDiv.innerHTML=`<li><a href="${file}">首页</a></li>`; 
            postList.appendChild(postTitleDiv);
            //创建标题卡片
        }
    }catch(error){
        console.error("文章加载失败：",error);
        document.getElementById('post-list').textContent = '文章加载失败。';
    }
}
// // 页面加载完成后调用
window.onload = loadPosts;
