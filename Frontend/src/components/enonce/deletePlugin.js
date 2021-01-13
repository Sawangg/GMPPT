export default function deleteButton () {

    const deleteButton1 = {
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
            const context = core.context;
            const rangeTag = core.util.createElement('div');
            core.util.addClass(rangeTag, '__se__format__range_custom');

            // @Required
            // Registering a namespace for caching as a plugin name in the context object
            context.customCommand = {
                targetButton: targetElement,
                tag: rangeTag
            };
        },

        action: function () {
            //console.log("dans fonction", this.context.customCommand.targetButton.children[0].id);
            //this.context.customCommand.targetButton.children[0].id;

        }
    }

    return deleteButton1;
    
};