    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxVideo = document.getElementById('lightboxVideo'); 
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.getElementById('closeLightbox');
    const lightboxOverlay = document.getElementById('lightboxOverlay');

    let currentProject = null; 
    let currentImageIndex = 0; 

    function openLightbox(media, description) {
        while (lightboxVideo.firstChild) {
            lightboxVideo.removeChild(lightboxVideo.firstChild);
        }

        if (media.video) {
            const videoElem = document.createElement('video');
            videoElem.classList.add('lightbox-video-element');  
            videoElem.setAttribute('controls', '');
            videoElem.setAttribute('autoplay', '');
            const sourceElem = document.createElement('source');
            sourceElem.setAttribute('src', media.video);
            sourceElem.setAttribute('type', 'video/mp4');
            videoElem.appendChild(sourceElem);
            lightboxVideo.appendChild(videoElem);
            lightboxVideo.style.display = 'block';
            lightboxImage.style.display = 'none';

            document.getElementById('prev').style.display = 'none';
            document.getElementById('next').style.display = 'none';

        } else if (media.images) {
            currentProject = media;
            lightboxImage.src = media.images[currentImageIndex];
            lightboxImage.style.display = 'block';
            lightboxVideo.style.display = 'none';

            document.getElementById('prev').style.display = 'block';
            document.getElementById('next').style.display = 'block';
        }

        lightboxCaption.innerText = description;
        lightbox.style.display = 'block';
    }

    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
        gridContainer.addEventListener('click', function(e) {
            if (e.target.closest('.grid-item')) {
                const gridItem = e.target.closest('.grid-item');
                
                let imgElem, descElem;
                
                if (gridItem.classList.contains('desc')) {
                    descElem = gridItem;
                    imgElem = document.querySelector(`.grid-item:not(.desc).${descElem.classList[1]}`);
                } else {
                    imgElem = gridItem;
                    descElem = document.querySelector(`.grid-item.desc.${imgElem.classList[1]}`);
                }
                
                const projectId = imgElem.id;
                const projectData = projects[projectId];        
                if (!projectData) return;
            
                if (projectData.video) {
                    openLightbox({ video: projectData.video }, projectData.description);
                } else {
                    openLightbox({ images: projectData.images }, projectData.description);
                }
            }
        });
    }
    
    document.getElementById('prev').addEventListener('click', function(event) {
        event.stopPropagation();

        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = currentProject.images.length - 1; 
        }
        lightboxImage.src = currentProject.images[currentImageIndex];
    });

    document.getElementById('next').addEventListener('click', function() {
        if (currentImageIndex < currentProject.images.length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0; 
        }
        lightboxImage.src = currentProject.images[currentImageIndex];
    });



    closeLightbox.onclick = function(event) {
        event.stopPropagation();

        if (lightboxVideo.firstChild) {
            lightboxVideo.firstChild.pause();
        }
        
        while (lightboxVideo.firstChild) {
            lightboxVideo.removeChild(lightboxVideo.firstChild);
        }

        lightbox.style.display = 'none';
    }

    lightbox.onclick = function(event) {
        if (event.target == event.currentTarget) {
            lightbox.style.display = 'none';
        }
    }


    const projects = {
        'img1': {
            images: ['Images/Projects/SOMBP/SOMBPTallBuildings.jpg', 'Images/Projects/SOMBP/SOMBPOverview1.jpg', 'Images/Projects/SOMBP/SOMBPOverview2.jpg', 'Images/Projects/SOMBP/SOMBPOutlook1.jpg', 'Images/Projects/SOMBP/SOMBPOutlook2.jpg', 'Images/Projects/SOMBP/SOMBPResearch.jpg'], 
            description: 'SOM Business Plan (2015)'
        },
        'img2': {
            images: ['Images/Projects/Tianjin/tianjincover1.jpg', 'Images/Projects/Tianjin/tianjinsetting2.jpg', 'Images/Projects/Tianjin/tianjinrail3.jpg', 'Images/Projects/Tianjin/tianjintransit4.jpg', 'Images/Projects/Tianjin/tianjinlivable5.jpg', 'Images/Projects/Tianjin/tianjinurban6.jpg', 'Images/Projects/Tianjin/tianjinvision7.jpg','Images/Projects/Tianjin/tianjinlanduse8.jpg', 'Images/Projects/Tianjin/tianjinsynopsis9.jpg'], 
            description: 'Tianjin Binhai Project (2010)'
        },
        'img3': {
            images: ['Images/Projects/Cafe/cafeplan1.jpg', 'Images/Projects/Cafe/cafegantt2.jpg', 'Images/Projects/Cafe/cafe3Dinterior3.jpg', 'Images/Projects/Cafe/cafemarquee4.jpg','Images/Projects/Cafe/cafeinterior5.jpg', 'Images/Projects/Cafe/cafemenu6.jpg', 'Images/Projects/Cafe/cafemargherita7.jpg'], 
            description: 'Fatty\'s Fresh Cafe (2012)'
        },

        'img4': {
            thumbnail: 'Images/Projects/Acrobats/aocproject.jpg', 
            video: 'Images/Projects/Acrobats/AcrobatsPromo.mp4',
            description: 'Acrobats of China Promo (2006)'
        }
};


