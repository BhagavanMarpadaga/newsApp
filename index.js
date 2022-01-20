class Newsapp {

    //get data from NYTimes
    async getData() {

        const API_KEY = 'j6yQw0t4Hi9BtXQ29VFbtrl8w2EDDqSZ';
        fetch('https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=j6yQw0t4Hi9BtXQ29VFbtrl8w2EDDqSZ')
            .then(response => response.json())
            .then(data => {
                //console.log(data.results)
                this.disPlayNews(data.results);
            }).catch(err => {
                console.log("Error while fetching data ", err);
            })
    }
    //Select top 5 news items
    disPlayNews(results) {
        const newsDiv = document.getElementById("latest-news");
        let i = 0;
        let count = 0;
        let newsJson=[];
        
        while (i < results.length) {
            if (results[i].multimedia === null) {
                i++;
                continue;
            }
            let newObj={};
            newObj['title']=results[i].title;
            newObj['url']=results[i].url;
            newsJson.push(newObj);
            const newsItem = this.createDomEle(results[i]);
            newsDiv.prepend(newsItem);
            i++;
            count++;
            if (count === 5) {
                break;
            }
        }

        console.log("Latest five news ",newsJson);
    }
    //create DOM element
    createDomEle(data) {
        const newdiv = document.createElement('div');
        newdiv.innerHTML = `<div class="card" style="width: 15rem;">
         <img class="card-img-top" src="${data.multimedia[0].url}" alt="Card image cap">
         <div class="card-body">
         <h6 class="card-title">Published on :${data.published_date.substring(0, 10)}</h6>
          <div class='card-title'><p class="card-text">  ${data.title.length < 50 ? data.title : data.title.substring(0, 47) + '...'}</p></div>
          <a href="${data.url}" class="btn btn-primary">Read more</a>
          </div>
        </div>`
        return newdiv;

    }
    //Intialize app
    IntializeApp() {
        this.getData();
    }

}
const app=new Newsapp();
app.IntializeApp();

// var user = 'bhagavanmarpadaga@gmail.com';
// var password = 'Hello@123';


// //var base64encodedData = Buffer.from(user + ':' + password).toString('base64');
// fetch('https://time.com',
// {
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       'Access-Control-Allow-Origin':'https://time.com',
//       'Access-Control-Allow-Methods':'get',
      
//     }
//   })
// .then(response => response.text())
// .then(data => {
//     console.log("data from times",data)
    
// }).catch(err => {
//     console.log("Error while fetching data ", err);
// })