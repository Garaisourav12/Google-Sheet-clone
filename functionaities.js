
function setFont(target){
    if(activeCell){
        let fontInput = target.value;
        console.log(fontInput);
        activeSheetObject[activeCell.id].fontFamily_data = fontInput;
        activeCell.style.fontFamily = fontInput;
        activeCell.focus();
    }
}
function setSize(target){
    if(activeCell){
        let sizeInput = target.value;
        activeSheetObject[activeCell.id].fontSize_data = sizeInput;
        activeCell.style.fontSize = sizeInput+'px';
        activeCell.focus();
    }
}

// bug fix
boldBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleBold();
})
function toggleBold(){
    if(activeCell){
        if(!activeSheetObject[activeCell.id].isBold) {
            activeCell.style.fontWeight = '600';
        }
        else{
            activeCell.style.fontWeight = '400';
        }
        activeSheetObject[activeCell.id].isBold = !activeSheetObject[activeCell.id].isBold;
        activeCell.focus();
    }
}

// bug fix
italicBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleItalic();
})
function toggleItalic(){
    if(activeCell){
        if(!activeSheetObject[activeCell.id].isItalic) {
            activeCell.style.fontStyle = 'italic';
        }
        else{
            activeCell.style.fontStyle = 'normal';
        }
        activeSheetObject[activeCell.id].isItalic = !activeSheetObject[activeCell.id].isItalic;
        activeCell.focus();
    }
}

// bug fix
underlineBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleUnderline();
})
function toggleUnderline(){
    if(activeCell){
        if(!activeSheetObject[activeCell.id].isUnderlined) {
            activeCell.style.textDecoration = 'underline';
        }
        else{
            activeCell.style.textDecoration = 'none';
        }
        activeSheetObject[activeCell.id].isUnderlined = !activeSheetObject[activeCell.id].isUnderlined;
        activeCell.focus();
    }
}


// bug ix
document.querySelectorAll('.color-prop').forEach(e => {
    e.addEventListener('click', (event) => event.stopPropagation());
})
function textColor(target){
    if(activeCell){
        let colorInput = target.value;
        activeSheetObject[activeCell.id].color = colorInput;
        activeCell.style.color = colorInput;
        activeCell.focus();
    }
}
function backgroundColor(target){
    if(activeCell){
        let colorInput = target.value;
        activeSheetObject[activeCell.id].backgroundColor = colorInput;
        activeCell.style.backgroundColor = colorInput;
        activeCell.focus();
    }
}

// bug fix
document.querySelectorAll('.alignment').forEach(e => {
    e.addEventListener('click', (event) => {
        event.stopPropagation();
        let align = e.className.split(' ')[0];
        alignment(align);
    });
})
function alignment(align){
    if(activeCell){
        activeCell.style.textAlign = align;
        activeSheetObject[activeCell.id].textAlign = align;
        activeCell.focus();
    }
}



document.querySelector('.copy').addEventListener('click', (event) => {
    event.stopPropagation();
    if (activeCell) {
        navigator.clipboard.writeText(activeCell.innerText);
        activeCell.focus();
    }
})

document.querySelector('.cut').addEventListener('click', (event) => {
    event.stopPropagation();
    if (activeCell) {
        navigator.clipboard.writeText(activeCell.innerText);
        activeCell.innerText = '';
        activeCell.focus();
    }
})

document.querySelector('.paste').addEventListener('click', (event) => {
    event.stopPropagation();
    if (activeCell) {
        navigator.clipboard.readText().then((text) => {
            formula.value = text;
            activeCell.innerText = text;
        })
        activeCell.focus();
    }
})

function zoomIn(){
    if(zoomLevel==10)return;

    zoomLevel++;
    document.querySelectorAll('.grid>*>*').forEach(e => {
        e.style.height = (zoomLevel*3 + 30) + 'px'; 
    })
    document.querySelectorAll('.grid-header-col,.grid-cell').forEach(e => {
        e.style.minWidth = (zoomLevel*10 + 100) + 'px'; 
        e.style.maxWidth = (zoomLevel*10 + 100) + 'px'; 
    })
    document.querySelectorAll('.row>:first-child,.grid-header>:first-child').forEach(e => {
        e.style.minWidth = (zoomLevel*7 + 70) + 'px'; 
    })
}
function zoomOut(){
    if(zoomLevel==-1)return;

    zoomLevel--;
    document.querySelectorAll('.grid>*>*').forEach(e => {
        e.style.height = (zoomLevel*3 + 30) + 'px'; 
    })
    document.querySelectorAll('.grid-header-col,.grid-cell').forEach(e => {
        e.style.minWidth = (zoomLevel*10 + 100) + 'px'; 
        e.style.maxWidth = (zoomLevel*10 + 100) + 'px'; 
    })
    document.querySelectorAll('.row>:first-child,.grid-header>:first-child').forEach(e => {
        e.style.minWidth = (zoomLevel*7 + 70) + 'px'; 
    })
}


downloadBtn.addEventListener("click",(e)=>{
    let jsonData = JSON.stringify(sheetsArray);
    let file = new Blob([jsonData],{type: "application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
});

openBtn.addEventListener("click",(e)=>{
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load",(e)=>{
            let readSheetData = JSON.parse(fr.result);
            readSheetData.forEach(e => {
                document.querySelector('.new-sheet').click();
                sheetsArray[activeSheetIndex] = e;
                activeSheetObject = e;
                changeSheet();
            })
        });
    });
});

formula.addEventListener('input', (event) => {
    activeCell.innerText = event.target.value;
    activeSheetObject[activeCell.id].content = event.target.value;
})



// try for bug fix
document.querySelector('body').addEventListener('click', () => {
    resetFunctionality();
})

// bug fix
formula.addEventListener('click', (event) => event.stopPropagation());

document.querySelectorAll('.select,.color-prop>*').forEach(e => {
    e.addEventListener('click', event => {
        event.stopPropagation();
    });
})



// find & replace
findIp.addEventListener('input', doFind);

// replace logic of all selected value
repBtn.addEventListener('click', () => {
    const findValue = findIp.value;
    const repValue = repBIp.value;

    document.querySelectorAll('.found').forEach(e => {
        const key = e.id;
        activeSheetObject[key].content = activeSheetObject[key].content.split(findValue).join(repValue);
    })

    // it will reflect then changes
    changeSheet();
})

// logic to find all possible match in current sheet
function doFind() {
    clearFound();

    const findValue = findIp.value;
    const pattern = new RegExp(findValue, 'g');

    if(!findValue)return;

    let count = 0;
    for(key in activeSheetObject){
        if(activeSheetObject[key].content.includes(findValue)){
            document.getElementById(key).classList.add('found');
            count += activeSheetObject[key].content.match(pattern).length;
        }
    }
    found.innerHTML = count;
}


// clear all selections
function clearFound() {
    document.querySelectorAll('.found').forEach(e => {
        e.classList.remove('found');
    })
    found.innerHTML = 0;
}