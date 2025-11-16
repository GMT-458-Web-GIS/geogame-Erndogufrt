[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/BhShQpq1)
# GMT 458 - Assignment 2: GeoGame

## Game Concept: "NYC Hotspot Hunter"

[cite_start]This project is a web-based GeoGame [cite: 4, 5] [cite_start]that uses the **NYC Taxi Data** [cite: 20] to challenge players to find the busiest taxi pickup locations in New York City based on the time of day.

---

## 1. Requirements (Gereksinimler)

[cite_start][cite: 14]

The functional requirements for this GeoGame are:

* **Geo-component:** The game must feature an interactive map of New York City.
* [cite_start]**Temporal-component:** The game must be time-limited. [cite: 6]
* **Interaction:** Users must interact with the map (e.g., clicking) to make guesses.
* [cite_start]**Scoring:** The game must calculate and display a high score based on the user's accuracy and speed. [cite: 5]
* [cite_start]**Data:** The game logic must be based on patterns derived from the NYC taxi dataset. [cite: 20]
* **Feedback:** The user must receive visual feedback on their guesses (e.g., proximity to the correct answer, points awarded).

## 2. Frontend Layout & Sketches

[cite_start][cite: 14]

The application will be a single-page application. The layout will be divided into three main components:

1.  **Stats Bar (Top):**
    * A static bar at the top of the screen.
    * Displays `Time Left: [00:60]` (counts down).
    * Displays `Current Score: [0]`.
    * Displays `Lives: [❤️❤️❤️]` (shows remaining lives).

2.  **Challenge Prompt (Middle):**
    * A text area below the Stats Bar.
    * It will show the current challenge, e.g., "**Find the busiest spot for: Tuesday, 17:00**".

3.  **Map View (Main Area):**
    * An interactive map (Leaflet) filling the rest of the screen.
    * The user clicks directly on the map to make their guess.
    * After a guess, a modal (popup) will appear showing the result, and a (Deck.gl) heatmap layer will show the *actual* answer before loading the next challenge.

### Layout Sketch (ASCII)

```
+-----------------------------------------------------+
| [Time: 00:45]   NYC HOTSPOT HUNTER    [Score: 1200] |
| [Lives: ❤️❤️_]                                     |
+-----------------------------------------------------+
|   Find the busiest pickup spot for: FRIDAY @ 22:00  |
+-----------------------------------------------------+
|                                                     |
|                                                     |
|                  [      MAP VIEW     ]             |
|                  [ (User Clicks Here) ]             |
|                  [                    ]             |
|                                                     |
|                                                     |
+-----------------------------------------------------+
```

## 3. Game Mechanics (Oyunun İlerlemesi)

[cite: 15]

This section answers the specific questions outlined in the assignment brief.

* **How the game will progress?** [cite: 17]
    * The game will be time-based, following the "complete as many tasks as possible" model. [cite: 17]
    * The user will have **60 seconds** to complete as many "challenges" as possible. [cite: 6]
    * A challenge consists of the game providing a random day and time (e.g., "Monday 08:00"). The user must then click on the map to guess the *busiest* taxi pickup location for that time.
    * Points will be awarded based on proximity to the correct answer (e.img., <100m = 1000 pts, 100m-500m = 500 pts, etc.).
    * There is no difficulty level selection; the difficulty comes from the time pressure and the complexity of the data patterns.

* **How many questions will there be?** [cite: 17]
    * There is no fixed number of questions. The number of questions answered depends entirely on the user's speed within the 60-second time limit.

* **How many lives, if any, does a user have?** [cite: 18]
    * The user will have **3 lives**.
    * A life is lost if the user's guess is significantly incorrect (e.g., more than 1.5 km away from the actual hotspot).
    * The game ends if the user runs out of lives or if the 60-second timer expires, whichever comes first.

## 4. Planned JS Libraries

[cite: 19]

* **Leaflet.js:** Will be used as the primary library for rendering the interactive base map, handling map tiles, and processing user click events (guesses).
* **Deck.gl (Bonus Package):** We plan to use Deck.gl to achieve the bonus. [cite: 19] After a user makes a guess, we will use Deck.gl to render an advanced **HeatmapLayer** over the Leaflet map. This layer will visualize the *actual* taxi pickup density for the given time, providing sophisticated geovisualization feedback to the user.
