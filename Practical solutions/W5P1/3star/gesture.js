class Gesture {
    // For some reason, the p5.js web editor does not 
    // allow private or static instance variables
    
    constructor(startFrame, startX, startY) {
      this.startFrame = startFrame;
      this.startX = startX;
      this.startY = startY;
      this.endFrame = startFrame;
      this.endX = startX;
      this.endY = startY;
      
    }
    
    addTouch(frame, newX, newY) {
      this.endFrame = frame;
      this.endX = newX;
      this.endY = newY;
    }
    
    getGestureType() {
      // Constants for the gesture type. Outside the web editor, these would be static variables.
      const SWIPE_LEFT = "left";
      const SWIPE_RIGHT = "right";
      const SWIPE_UP = "up";
      const SWIPE_DOWN = "down";
      const NONE = "none";
      
      // The minimum distance a touch should cover to count as a swipe
      const DIST_THRESHOLD = 20;
      // The maximum number of frames a touch can last to count as a swipe (one second)
      const TIME_THRESHOLD = 60;
      
      // Calculate the differences between the start and end of the touch
      const xDist = abs(this.endX - this.startX);
      const yDist = abs(this.endY - this.startY);
      
      const frameDiff = this.endFrame - this.startFrame;
      console.log(xDist, yDist, frameDiff)
      
  
      if (frameDiff < TIME_THRESHOLD && xDist > DIST_THRESHOLD && yDist < DIST_THRESHOLD) {
        if (this.endX < this.startX) {
          return SWIPE_LEFT;
        } else {
          return SWIPE_RIGHT;
        }
      } else if (frameDiff < TIME_THRESHOLD && yDist > DIST_THRESHOLD && xDist < DIST_THRESHOLD) {
        if (this.endY < this.startY) {
          return SWIPE_UP;
        } else {
          return SWIPE_DOWN;
        }
      } else {
        return NONE;
      }
    }
    
  }