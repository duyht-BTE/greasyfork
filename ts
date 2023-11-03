// ==UserScript==
// @name         Lưu câu hỏi và đáp án
// @namespace    duyht.me
// @version      1
// @description  Lưu và hiển thị đáp án khi bạn bôi đen câu hỏi
// @author       duyht
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let savedData = JSON.parse(localStorage.getItem('savedData')) || {};

    // Tạo một phím tắt để lưu câu hỏi và đáp án
    document.addEventListener('keydown', function(event) {
        if (event.key === 'x' || event.key === 'X') { // Sử dụng phím X
            let selectedText = window.getSelection().toString();
            if (selectedText) {
                let answer = prompt('Nhập đáp án cho câu hỏi:');
                if (answer) {
                    savedData[selectedText] = answer;
                    localStorage.setItem('savedData', JSON.stringify(savedData));
                }
            }
        }
    });

    // Tạo một phím tắt để hiển thị đáp án khi bôi đen câu hỏi
    document.addEventListener('keydown', function(event) {
        if (event.key === 'z' || event.key === 'Z') { // Sử dụng phím Z
            let selectedText = window.getSelection().toString();
            if (selectedText && savedData[selectedText]) {
                alert('Đáp án: ' + savedData[selectedText]);
            }
        }
    });
})();
