/// <reference path="FamilyTree.d.ts" />


var family = new FamilyTree('#tree', {
    nodeBinding: {
        img_0: 'photo'
    },
    editForm: {
        generateElementsFromFields: false,
        photoBinding: "photo",        
        elements: [
            { type: 'textbox', label: 'Photo Url', binding: 'photo', btn: 'Upload' },
        ]
    }
});


family.editUI.on('element-btn-click', function (sender, args) {
    FamilyTree.fileUploadDialog(function (file) {
        var data = new FormData();
        data.append('files', file);

        fetch('/Home/UploadPhoto', {
            method: 'POST',
            body: data
        })
            .then(response => {
                response.json().then(responseData => {
                    args.input.value = responseData.url;
                    sender.setAvatar(responseData.url);
                });
            });
    });
});


family.load([
    { id: 1, pids: [2], gender: 'female'},
    { id: 2, pids: [1], gender: 'male' },
    { id: 3, mid: 1, fid: 2, gender: 'female' },
]);