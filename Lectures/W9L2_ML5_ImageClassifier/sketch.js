// Example from ml5.js website and coding train / daniel shiffman (ml5.js: Image Classification with Mobile Net)
// https://learn.ml5js.org/#/tutorials/hello-ml5
// https://www.youtube.com/watch?v=yNkAuWz5lnY&list=PLRqwX-V7Uu6YPSwT06y_AEYTqIwbeam3y&index=5

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

// For displaying the label and the confidence with predicted result
let label = "loading...";
let confidence = 0;

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  img = loadImage('assets/Golden_Retriever_Hund_Dog.jpg');
}

// A function to run when we get any errors and the results
function gotResult(results, error) {
	// Display error in the console
	if (error) {
	  console.error(error);
	  return;
	} else {
	  // The results are in an array ordered by confidence [0] most confident [n] less confident.
	  console.log(results);
	  label = results[0].label;
	  confidence = results[0].confidence;
	  fill(0);
	  textSize(18);
	  text(label, 10, height-50);
	  text(confidence, 10, height-20);
	}
  }
  

function setup() {
  createCanvas(600, 600);
  classifier.classify(img, gotResult);
  image(img, 0, 0, width, height-100);
  // Resize the image.
}

