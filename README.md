# Learning Style Identifier
A simple web application that helps users discover their learning style (Visual, Auditory, Kinesthetic) through an interactive questionnaire. The project includes a frontend, backend API, and optional PM2 + Nginx deployment setup.

## Features
- Welcome page with images explaining learning styles  
- Interactive quiz (index.html)  
- Backend API (`server.js`) that processes answers  
- External API integration for learning tips  
- PM2 process management for production  

## Installation
git clone https://github.com/elijahkabastsi/learning-style-identifier.git
cd learning-style-identifier/backend
npm install

## Start the backend:
pm2 start server.js --name learning-style-backend
pm2 save

## API Usage

## Submit answers:
curl -X POST http://localhost:3000/api/submit \
-H "Content-Type: application/json" \
-d "{\"answers\":[\"visual\",\"auditory\",\"kinesthetic\"]}"

## Frontend Pages
welcome.html — introduction + images + button to start quiz
index.html — questionnaire + results

## Images used:
Visual: https://www.evelynlearning.com/wp-content/uploads/2023/11/side-view-boy-wearing-virtual-reality-headset-holding-books-1024x683.jpg
Auditory: https://cdn.prometheanworld.com/wp-content/uploads/2023/06/26195056/GettyImages-145062165-1-1296x550.jpg
Kinesthetic: https://www.brainbalancecenters.com/hs-fs/hubfs/Imported_Blog_Media/hands-on-kinesthetic-learning-activities-1.jpeg?width=1024&name=hands-on-kinesthetic-learning-activities-1.jpeg

## Deployment
PM2 for backend process
Nginx can be used as a load balancer (Web01)

## Demo Video
Demo Link: https://youtu.be/53eCthsSU8Y?si=_AceY15Ob-a_9hsi https://youtu.be/53eCthsSU8Y?si=_AceY15Ob-a_9hsi

## Credits
Advice API: https://api.adviceslip.com