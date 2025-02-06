class QuestLocation {
    #description;
    #options;
    #destinations;

    /**
     * Creates a new location
     * @param {string} description 
     * @param {string[]} options An array of option choice descriptions
     * @param {number[]} destinations The location indices that the options lead to
     */
    constructor(description, options, destinations) {
        this.#description = description;
        this.#options = options;
        this.#destinations = destinations;
    }

    /**
     * Gets the location description
     * @returns {string}
     */
    getDescription() {
        return this.#description;
    }


    /**
     * Gets the options for this location
     * @returns {Map<string, string>}
     */
    getOptions() {
        return this.#options;
    }


    /**
     * Gets the destination index associated with the user's option choice
     * @param {number} optionIndex The index of the option the user has selected
     * @returns {number}
     */
    getDestinationChoice(optionIndex) {
        if (optionIndex >= 0 && optionIndex < this.#destinations.length) {
            return this.#destinations[optionIndex];
        }
        return -1;
    }
}