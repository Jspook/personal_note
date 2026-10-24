function addNode() {
            // 1. <p>Java</p>
            let pt4 = document.createElement("p");
            // 2. create text node 
            let txt = document.createTextNode("Java");
            // 3. append text node to a parent node
            // 4. select a parent node            
            let parent1 = document.getElementById("div1");
            // 5. append element node to a parent node
            
            /*  uncomment in step 2 **/
            let childP1 = document.getElementById("p1");
            parent1.insertBefore(pt4, childP1);
            pt4.appendChild(txt);
        }

        function deleteNode() {
            let parent2 = document.getElementById("div1");
            let delPtag = document.getElementById("p1");
            parent2.removeChild(delPtag);
        }

        function addNewImage() {
            // <img src="https://webdev.it.kmitl.ac.th/labdocs/unit3/images/md2.png">
            let imgtag = document.createElement("img");

            imgtag.setAttribute('src', 'https://webdev.it.kmitl.ac.th/labdocs/unit3/images/md2.png');

            // add IMG to parent node                                               
            document.getElementById("div1").appendChild(imgtag);
        }          

        function changeStyles() {
            let d = document.getElementById("div1");
                d.style.color = "blue";
                d.style.fontFamily = "Comic Sans MS";
        }