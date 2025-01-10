# Picture Galley

> A Vue.js picture gallery with Lazy loading implemented, using images from picsum.photos

#### Directory layout and basic structuring of the project


    .
    ├── src
    │   ├── components
    │   │   ├── ImageCard
    │   │   ├── NavBar
    │   │   ├── TheFooter
    │   │   ├── ThemeSwitcherButton
    ├── pages (all routes that are rendered as pages)
    │   ├── home
    │   ├── about
    ├── types (common types) 
    ├── 
    ├── package.json
    ├── package-lock.json
    ├── main.ts App's entrypoint
    └── tailwind.config.ts (Tailwind config + with icons)

Demo at - https://picsum-photos.web.app/

Using Pinia for state management, with persisted state plugin for persistance to localStorage

Adding firebase with automatic CD using Github Action.


Further Enhancements that can be made :
    - Add ESLint
    - HomePage can still be modularized
    - Better Types.
    - We could add throttling on intersection observer to improve performance.
    - Add toast notification at error occurence.
    - Extract out baseURl if API end point is fixed and use it from .env