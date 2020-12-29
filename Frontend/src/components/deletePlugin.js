const deleteButton = {
    // @Required
    // plugin name
    name: 'delete_button',

    // @Required
    // data display
    display: 'command',

    // @Required
    // add function - It is called only once when the plugin is first run.
    // This function generates HTML to append and register the event.
    // arguments - (core : core object, targetElement : clicked button element)
    add: function (core, targetElement) {
    },

    action: function (e) {
        console.log(e);
    }
};

export default deleteButton