const logosList = [
    "codecov",
    "travis",
    "macos"
];

function toggleLogoSelector() {
    const logoSelector = document.getElementById("logoSelector");
    const addLogoCheckbox = document.getElementById("addLogoCheckbox");
    if (addLogoCheckbox.checked) {
        logoSelector.style.display = "block";
    } else {
        logoSelector.style.display = "none";
    }
    generateBadge();
}

function generateBadge() {
    const badgeText = document.getElementById("badgeText").value.replace(/[/]/g, '_');
    const badgeText2 = document.getElementById("badgeText2").value.replace(/[/]/g, '_');
    const badgeStyle = document.getElementById("badgeStyle").value;
    const badgeColor = document.getElementById("badgeColor").value.substring(1); // Remove o símbolo '#'
    const badgeLogoCor = document.getElementById("badgeLogoCor").value.substring(1); // Remove o símbolo '#'
    const badgeColor2 = document.getElementById("badgeColor2").value.substring(1); // Remove o símbolo '#'
    const addLogoCheckbox = document.getElementById("addLogoCheckbox");
    const comNomeCheckbox = document.getElementById("addLogoCheckbox2");
    const semNomeCheckbox = document.getElementById("addLogoCheckbox3");
    const badgeLogo = document.getElementById("badgeLogo").value;
    const badgeLink = document.getElementById("badgeLink").value;
    let badgeURL;

    if (addLogoCheckbox.checked && badgeLogo !== "") {
        if (comNomeCheckbox.checked) {
            if (badgeText2 !== "" || badgeText2 !== "") {
                badgeURL = `https://img.shields.io/badge/${encodeURIComponent(badgeLogo)}-${encodeURIComponent(badgeText2)}-${badgeColor}?style=${badgeStyle}&logo=${badgeLogo}&logoColor=${badgeLogoCor}&labelColor=${badgeColor2}&link=${badgeLink}`;
            } else {
                badgeURL = `https://img.shields.io/badge/${encodeURIComponent(badgeLogo)}-${badgeColor}?style=${badgeStyle}&logo=${badgeLogo}&logoColor=${badgeLogoCor}&labelColor=${badgeColor2}&link=${badgeLink}`;
            }
        } else if (semNomeCheckbox.checked) {
            if (badgeText !== "" || badgeText2 !== "") {
                badgeURL = `https://img.shields.io/badge/${encodeURIComponent(badgeText)}-${encodeURIComponent(badgeText2)}-${badgeColor}?style=${badgeStyle}&logo=${badgeLogo}&logoColor=${badgeLogoCor}&labelColor=${badgeColor2}&link=${badgeLink}`;
            } else {
                badgeURL = `https://img.shields.io/badge/${encodeURIComponent(badgeLogo)}-${badgeColor}?style=${badgeStyle}&logo=${badgeLogo}&logoColor=${badgeLogoCor}&labelColor=${badgeColor2}&link=${badgeLink}`;
            }
        } else {
            badgeURL = `https://img.shields.io/badge/${encodeURIComponent(badgeLogo)}-${badgeColor}?style=${badgeStyle}&logo=${badgeLogo}&logoColor=${badgeLogoCor}&labelColor=${badgeColor2}&link=${badgeLink}`;
        }
    } else {
        if (badgeText !== "" || badgeText2 !== "") {
            badgeURL = `https://img.shields.io/badge/${encodeURIComponent(badgeText)}-${encodeURIComponent(badgeText2)}-${badgeColor}?style=${badgeStyle}&labelColor=${badgeColor2}&link=${badgeLink}`;
        } else {
            badgeURL = "";
        }
    }

    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', badgeURL);
    document.getElementById("badgeCriado").innerHTML = '';
    document.getElementById("badgeCriado").appendChild(imgElement);
}

function createLogoOptions() {
    const logoSelector = document.getElementById("badgeLogo");
    logosList.forEach(logo => {
        const optionElement = document.createElement("option");
        optionElement.value = logo;
        optionElement.textContent = logo;
        logoSelector.appendChild(optionElement);
    });
}

function toggleComNome() {
    const comNomeCheckbox = document.getElementById("addLogoCheckbox2");
    const semNomeCheckbox = document.getElementById("addLogoCheckbox3");
    if (comNomeCheckbox.checked) {
        semNomeCheckbox.checked = false;
    }
}

function toggleSemNome() {
    const comNomeCheckbox = document.getElementById("addLogoCheckbox2");
    const semNomeCheckbox = document.getElementById("addLogoCheckbox3");
    if (semNomeCheckbox.checked) {
        comNomeCheckbox.checked = false;
    }
}

document.getElementById("downloadPNGButton").addEventListener("click", function() {
    const badgeCriado = document.getElementById("badgeCriado");

    // Verifica se o badge foi criado antes de prosseguir
    if (!badgeCriado.hasChildNodes()) {
        alert("Crie o badge antes de fazer o download!");
        return;
    }

    const imgElement = badgeCriado.getElementsByTagName("img")[0];

    // Cria uma nova imagem para evitar problemas de CORS
    const img = new Image();
    img.crossOrigin = "anonymous"; // Define que a imagem pode ser carregada de forma anônima
    img.onload = function() {
        // Cria um elemento canvas temporário
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Define as dimensões do canvas com base na imagem do badge
        canvas.width = img.width;
        canvas.height = img.height;

        // Desenha a imagem do badge no canvas
        context.drawImage(img, 0, 0);

        // Cria um link para download
        const downloadLink = document.createElement("a");
        downloadLink.download = "badge.png"; // Nome do arquivo para download
        downloadLink.href = canvas.toDataURL("image/png");

        // Clica automaticamente no link para iniciar o download
        downloadLink.click();
    };

    // Define a URL da nova imagem com a mesma URL da imagem do badge
    img.src = imgElement.src;
});




document.getElementById("downloadSVGButton").addEventListener("click", function() {
    const badgeCriado = document.getElementById("badgeCriado");

    // Verifica se o badge foi criado antes de prosseguir
    if (!badgeCriado.hasChildNodes()) {
        alert("Crie o badge antes de fazer o download!");
        return;
    }

    const imgElement = badgeCriado.getElementsByTagName("img")[0];

    // Cria um novo elemento <svg>
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", imgElement.width);
    svg.setAttribute("height", imgElement.height);
    svg.setAttribute("viewBox", `0 0 ${imgElement.width} ${imgElement.height}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Badge");

    // Cria um link <a> para envolver todo o conteúdo do SVG
    const link = document.createElementNS("http://www.w3.org/2000/svg", "a");
    link.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", document.getElementById("badgeLink").value);

    // Cria um novo elemento <image> e copia a imagem do badge para o elemento <svg>
    const svgImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
    svgImage.setAttribute("x", "0");
    svgImage.setAttribute("y", "0");
    svgImage.setAttribute("width", imgElement.width);
    svgImage.setAttribute("height", imgElement.height);
    svgImage.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", imgElement.src);

    // Adiciona o elemento <image> dentro do link <a>
    link.appendChild(svgImage);

    // Adiciona o link <a> dentro do elemento <svg>
    svg.appendChild(link);

    // Converte o elemento <svg> em uma string
    const svgContent = new XMLSerializer().serializeToString(svg);

    // Cria um Blob com o conteúdo SVG
    const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });

    // Cria um link para download
    const downloadLink = document.createElement("a");
    downloadLink.download = "badge.svg"; // Nome do arquivo para download

    // Cria uma URL temporária para o Blob
    const svgUrl = URL.createObjectURL(svgBlob);

    // Define o link de download para o URL do Blob
    downloadLink.href = svgUrl;

    // Clica automaticamente no link para iniciar o download
    downloadLink.click();

    // Limpa a URL temporária após o download
    URL.revokeObjectURL(svgUrl);
});







// Executa a função de criar os options do seletor de logos ao carregar a página
window.onload = function () {
    createLogoOptions();
};