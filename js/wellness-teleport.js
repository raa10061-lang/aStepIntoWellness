import { Component, Property } from '@wonderlandengine/api';

/*
This code handles teleportation between different panels in the game
Its logic is linking button clicks to target spawn locations and moving the palyer there for the next task
 */
export class WellnessTeleport extends Component {
    static TypeName = 'wellness-teleport';

    //Properties created in the javascript commponent
    static Properties = {

        //The button objects
        mainToMenuButton: Property.object(), // Button in main scene that takes user to menu
        menuToSummerButton: Property.object(),  // Button in menu that takes user to summer start
        summerStartTaskButton: Property.object(),   // Button at summer start panel that begins task sequence
        dogButton: Property.object(),    // Button near dog that moves to trash task panel
        trashButton: Property.object(),   // Button near trash that moves to flower task panel
        flowerButton: Property.object(),  // Button near flowers that returns user to menu

        //The teleportation target location
        mainSpawn: Property.object(),   // Not used; player already starts in main scene automatically
        menuSpawn: Property.object(),  // Where player stands in front of menu panel
        summerSpawn: Property.object(), // Starting point for summer scene
        dogSpawn: Property.object(),    // Position for dog panel spawning
        trashSpawn: Property.object(),  // Position for trash panel spawing
        flowerSpawn: Property.object(), // Position for flower panel spawning
    };


    //in this section each button will bind to its matching teleport destination.

    start() {
        //Connect each button to a teleport action 
        this._bind(this.mainToMenuButton, () => this._teleportTo(this.menuSpawn)); //Binds clicking menu button to menu spawn
        this._bind(this.menuToSummerButton, () => this._teleportTo(this.summerSpawn)); //Binds clicking summer button to summer spawn
        this._bind(this.summerStartTaskButton, () => this._teleportTo(this.dogSpawn));  //Binds clicking start task button to dog panel spawn
        this._bind(this.dogButton, () => this._teleportTo(this.trashSpawn));  //Binds clicking dog button button to trash panel spawn
        this._bind(this.trashButton, () => this._teleportTo(this.flowerSpawn));  //Binds clicking trash button to flower panel spawn
        this._bind(this.flowerButton, () => this._teleportTo(this.menuSpawn));  //Binds clicking flower button to menu spawn

        
    }

    // the bind function connects a button's click event to a teleport action
     
    _bind(buttonObj, callback) {
        if (!buttonObj) return;  // Skip if no object assigned

        // Get the cursor target component that listens for clicks
        const ct = buttonObj.getComponent('cursor-target');

        // If the button has a cursor target, bind the click event
        if (ct) ct.onClick.add(callback);
    }

    // the teleport to function moves the player object to the world position of the target. This is what creates the teleporting effect
   
    _teleportTo(targetObj) {
        if (!targetObj) return;  // Skip if target is missing

        // Get the world space coordinates of the target location
        const pos = targetObj.getTranslationWorld();

        // Move the player (the object this script is attached to)
        this.object.setTranslationWorld(pos);
    }
}
