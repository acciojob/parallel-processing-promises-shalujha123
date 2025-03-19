//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url){
	return new Promise((resolve,reject)=>{
		const img = new Image()
		img.src = url
		img.onload = () => resolve(img)
		img.onerror = () => reject(new Error("Failed to load image"))
	})
}

function downloadImages(){
	const promises = images.map(image => downloadImage(image.url))
	let load = document.createElement("div")
	load.id = "loading"
	load.textContent = "Loading..."
	output.append(load)
	Promise.all(promises)
	.then((images) =>{
		load.remove()
		images.forEach(image =>{
			output.append(image)
		})
	})
	.catch(()=>{
		load.remove()
		let err = document.createElement("div")
		err.id = "error"
		err.textContent = "Failed to load images"
		output.append(err)
	})
}

btn.addEventListener("click",downloadImages)























