# React devs KE Meetup February 2025 | Crafting Reusable Code with React & TypeScript: From Design to NPM 

[slides used in the presentation](https://docs.google.com/presentation/d/1yFKSxNL-MHYddVMmt-dVi9wdlypw-aev2w7-I_O3aD0/edit?usp=sharing)



## [building the generic component](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/blob/f1c78a23cfd6bb0f71134105c3ec4d77ddb6c038/simple-app) 

In this example we'll use a tale to demostrate how to build a generic component that adapts to any type of data


to go from a fully
[hardcoded componenst](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/blob/7e4dea4a63b5e07ca83c98c9072a529ae30ebf28/simple-app/src/components/HardCodedTable.tsx) to a
[more dynamic one](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/blob/7e4dea4a63b5e07ca83c98c9072a529ae30ebf28/simple-app/src/components/DynamicRowsTable.tsx) 

we first put
the tables rows into an array and then pass that array to the component which we
loop over to get the table rows

<video controls src="https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/raw/d45806eca0a9a6b67f047b439894905a0b712450/docs/rows-to-mapped-rows.mp4" title="rows-to-mapped-rows"></video>

And the same can also be done to
[the columns](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/blob/7e4dea4a63b5e07ca83c98c9072a529ae30ebf28/simple-app/src/components/DynamicRowsAndColumnsTable.tsx)

<video controls src="https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/raw/d45806eca0a9a6b67f047b439894905a0b712450/docs/static-to-dynamic-coumns.mp4" title="static-to-dynamic-coumns"></video>

and now our table mponent can take in the data and the columns and then render
the table rows and columns

```tsx
type Player = {
  id: number;
  name: string;
  age: number;
  rank: number;
}

type TableColumn = {
  label: string;
  accessor: keyof Player;
};
interface DynamicPlayerstableProps {
  columns: Array<TableColumn>;
  data: Array<Player>;
}

export function DynamicPlayerstable({data,columns}: DynamicPlayerstableProps) {
    return ....
}
```

Our [players table component](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/blob/d45806eca0a9a6b67f047b439894905a0b712450/simple-app/src/components/DynamicPlayersTable.tsx)

is now decoupled from the data but we can take this further by decouping it from
the shape of data. In it's current form it requires us to pass in data like this

```tsx
const columns: Array<TableColumn> = [
  { label: "ID", accessor: "id" },
  { accessor: "name", label: "Name" },
  { accessor: "age", label: "Age" },
  { accessor: "rank", label: "Rank" },
];

const data: Array<Player> = [
  { id: 1, name: "Player1", age: 25, rank: "Silver" },
  { id: 2, name: "Player2", age: 30, rank: "Gold" },
  { id: 3, name: "Player3", age: 22, rank: "Bronze" },
  { id: 4, name: "Player4", age: 28, rank: "Platinum" },
  { id: 5, name: "Player5", age: 24, rank: "Diamond" },
  { id: 6, name: "Player6", age: 27, rank: "Silver" },
  { id: 7, name: "Player7", age: 29, rank: "Gold" },
];
return <DynamicPlayerstable columns={columns} data={data} />;
```

The table structure is dynamic enough to accomodate any array of objects we pass
in with the only required field being od `id` because we use it as the key to
every row

```tsx
<tbody>
  {data.map((player) => (
    <tr key={player.id}>
      {columns.map((column) => (
        <td key={column.accessor}>{player[column.accessor]}</td>
      ))}
    </tr>
  ))}
</tbody>
```

To accomplish this we'll need to use a generic type usuaally maerked as `T` which is a way to pass in variables to out types and interfaces

firdt we pass it into the component

```tsx
export function DynamicPlayerstable<T>({ data, columns }: DynamicPlayerstableProps);
```

then we pass it into our parameter interface

```tsx
interface DynamicPlayerstableProps<T> {
  columns: Array<TableColumn>;
  data: Array<Player>;
}

export function DynamicPlayerstable<T>({ data, columns }: DynamicPlayerstableProps<T>);
```

this type `T` should be the type of the object that we pass in to the array so we can now replace type `Player` with `T`

```tsx
interface DynamicPlayerstableProps<T> {
  columns: Array<TableColumn>;
  data: Array<T>;
}
```

our `TbaleColumn` type was also relying on the type `Player` so the type is also going to change to `TableColumn<T>` so we can now replace type `Player` with `T`

<video controls src="https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/raw/d45806eca0a9a6b67f047b439894905a0b712450/docs/type-Player-to-T.mp4" title="type-Player-to-T"></video>

At this point typescipt will be able to give us auto complete for the coluns field based on what type `T` is based on the array we pass into the data field

with player rows array
![alt text](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/raw/d45806eca0a9a6b67f047b439894905a0b712450/docs/player-autocomplete.png)

with teams row array
![alt text](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/raw/d45806eca0a9a6b67f047b439894905a0b712450/docs/teams-autocomplete.png)

![alt text](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/raw/d45806eca0a9a6b67f047b439894905a0b712450/docs/symbol-error.png)
Out component is working fine from the outside but typescript is having a hader time understanding the types inside the component sine generice type `T` could be any type and it's keys could be `numver|string|symbol` , `symbols` aren't allowed as react keys so we can narrow that type by using an intersection `&` to inform typescrpt that the keys of T must be a string like we had in type `Player`

```tsx
type TableColumn<T> = {
  label: string;
  accessor: keyof T & string;
};
interface DynamicPlayerstableProps<T> {
  columns: Array<TableColumn<T>>;
  data: Array<T>;
}
```

That resolves that issue but introduces another one where typescipt doesn't know what type `T` is and what type `T[keyof T]` is going to resolve to

Because in it's current shape bothe

```tsx
type Player = {
  id: number;
  name: string;
  age: number;
  rank: string;
};
//  and

type playeyWithArrays = {
  id: Array<number>;
  name: Array<string>;
  age: Array<number>;
  rank: Date;
  ratio: {
    numerator: number;
    denominator: number;
  };
};
```

>[!TIP]
> any type can be passed into the component as type `T` , react and our table doesn't expect that and will throw an error if we try to render an array or `Date` object in a `td` or any react node . so to further specify what inputs we expect we can use the `extends` operator

>[!NOTE]
> in typescript it's either used to inherit behaviour from a class or to mark a generic type as a subtype of another more specific type

```tsx
T extends string // can only accept strings
T extends {} // can only accept objects
T extends {id:number} // can only accept objects with a key `id` that is a number
T extends Record<string, string | number> // can only accept objects with string or number keys
```

We'll use this to specify that only objects with string or number keys can be passed into the table

>[!NOTE]
> `Record<TKey, TValue>` can be used to specify objects

```tsx
type TableColumn<T extends Record<string, string|number >> = {
  label: string;
  accessor: keyof T & string;
};
interface GenericTableProps<T extends Record<string, string|number >> {
  columns: Array<TableColumn<T>>;
  data: Array<T>;
}

export function GenericTable<T extends Record<string, string|number >>
```

now with this we can only pass in objects that have string or number keys

```tsx
const data = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    rank: "Gold",
  },
];
const baddata = [
  {
    id: 1,
    name: "John Doe",
    age: [30],
    rank: new Date(),
  },
];
```

before restrictions
![bad inputs without restriction](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/raw/d45806eca0a9a6b67f047b439894905a0b712450/docs/before-restriction.png)
after restrictions
![bad inputs with restriction](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/raw/d45806eca0a9a6b67f047b439894905a0b712450/docs/after-enforcement.png)

one last thing is rqeire type `T` to include a key `id` because it's going to be used as the key for the table rows

```tsx
type GenericItem = Record<string, string | number> & { id: string }; // field of id:string required in passed in objects
type TableColumn<T extends GenericItem> = {
  label: string;
  accessor: keyof T & string;
};
interface GenericTableProps<T extends GenericItem> {
  columns: Array<TableColumn<T>>;
  data: Array<T>;
}

export function GenericPlayerstable<T extends GenericItem>({ data, columns }: GenericTableProps<T>);
```

![T-with-no-id](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/raw/d45806eca0a9a6b67f047b439894905a0b712450/docs/t-with-no-id.png)



>[!TIP]
>Bonus tip : handling nested objects

```tsx
const data = [
  {
    id: "1",
    name: "John Doe",
    age: 30,
    rank: "Gold",
    ratio: {
      numerator: 1,
      denominator: 2,
    },
  },
];
```

This type will cause issues because field ratio is an object and we can't render it directly in the table because react can't render objects as its children


First the Record type should also intersect with an `object` type

```tsx
// now lets the value of the record to be an object
type GenericItem = Record<string, string | number | object> & { id: string };
type TableColumn<T extends GenericItem> = {
  label: string;
  accessor: PossibleNestedUnions<T, 10> & string;
};

interface GenericTableProps<T extends GenericItem> {
  title:string;
  description?:string;
  columns: Array<TableColumn<T>>;
  data: Array<T>;
}
```

Then we add checks to handle object types
```tsx
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => {
                  const value = row[column.accessor];
                  // this line grabs the nested object and maps it to a <td>
                  if (column.accessor.includes(".")) {
                    return <td key={column.accessor}>{getNestedProperty(row, column.accessor)}</td>;
                  }
                  //  we've already checked if the accessor is a nested object but typescript is not yet aware and 
                  // still thinks value is type string | number | objct at this point 
                  //  this part is only here to narrow the type or catch objects types that fell through
                  //  so that the value type on the section below is of type string | number
                  if (typeof value === "object") {
                    const nestedValue = getNestedProperty(row, column.accessor)
                    if(typeof nestedValue !== "string" || typeof nestedValue !== "number") {
                      // to avoid accidentally trying to renedr objects as react children
                      return <td key={column.accessor}>{JSON.stringify(nestedValue)}</td>;
                    }
                    return <td key={column.accessor}>{getNestedProperty(row, column.accessor)}</td>;
                  }
                  // value type is string| number , safe to render ina react td 
                  return <td key={column.accessor}>{value}</td>;
                })}
              </tr>
            ))}
          </tbody>
```

[`getNestedProperty`](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/blob/7e4dea4a63b5e07ca83c98c9072a529ae30ebf28/simple-app/src/utils/object.ts) is a utility function to retrieve a nested property value from an object based on a dot-separated path

example

```tsx
const obj = { a: { b: { c: 42 } } };
console.log(getNestedProperty(obj, "a"));   // Outputs: { b: { c: 42 } }
console.log(getNestedProperty(obj, "a.b.c")); // Outputs: 42
console.log(getNestedProperty(obj, "a.b.x")); // Outputs: undefined 
```

so how do we get the types to the dot separated values? this one is non trivial and one of the examples of the ugly typescript people hate.
[`PossibleNestedUnions`](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/blob/e9dce79b998dd6a1a0c22f1fccf1438858510eed/simple-app/src/types/nested_objects_union.ts) uses recursion to extract the dot separated keys to inputs of type nested object 

example

```ts
type ExampleType = {
  a: string;
  b: {
    c: number;
    d: {
      e: boolean;
      f: {
        g: string;
      };
    };
  };
  h: Date;
};

type NestedKeys1 = PossibleNestedUnions<ExampleType, 1>;  // "a" | "b" | "h"
type NestedKeys2 = PossibleNestedUnions<ExampleType, 2>;  // "a" | "b" | "b.c" | "b.d" | "h"
type NestedKeys3 = PossibleNestedUnions<ExampleType, 3>;  // "a" | "b" | "b.c" | "b.d" | "b.d.e" | "b.d.f" | "h"
type NestedKeysAll = PossibleNestedUnions<ExampleType>;   // includes all nested paths
```

and now our new type will be 

```tsx
import { PossibleNestedUnions } from "../types/nested_objects_union";
import { getNestedProperty } from "../utils/object";

type GenericItem = Record<string, string | number | object>&{id:string}
type TableColumn<T extends GenericItem> = {
  label: string;
  accessor: PossibleNestedUnions<T> & string;
};
interface GenericTableProps<T extends GenericItem> {
  columns: Array<TableColumn<T>>;
  data: Array<T>;
}
```

with the array
```ts
   const gooddata = [
     {
       id: "1",
       name: "John Doe",
       age: 30,
       rank: "Gold",
       stats:{
        running:20,
        jumping:10,
        swimming:30,
        weapons:{
          stars:10,
          katana:5
        }
       }
     },
     {
       id: "2",
       name: "Pedro",
       age: 30,
       rank: "Gold",
       stats:{
        running:20,
        jumping:10,
        swimming:30,
        weapons:{
          stars:1,
          katana:4,
          blades:{
            short:10,
            long:5
          }
        }
       }
     },
   ];
```
we'll get auto complete for all the possibly nested types
![netsed-values-auto comlete](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/raw/main/docs/netsed-values-auto%20comlete.png)

Finally we can make the title and description of the table dynamic too because we can render more than just players with this component


```tsx
      <GenericTableWithNestedFields
      title="Players Table"
        description="list of players without their stats"
        data={gooddata}
        columns={[
          { accessor: "id", label: "age" },
          { accessor: "name", label: "name" },
          { accessor: "age", label: "age" },
          { accessor: "rank", label: "rank" },
        ]}
      />
      <GenericTableWithNestedFields
      title="Players Table with stats"
        description="list of players with their stats"
        data={gooddata}
        columns={[
          { accessor: "id", label: "age" },
          { accessor: "name", label: "name" },
          { accessor: "age", label: "age" },
          { accessor: "rank", label: "rank" },
          { accessor: "stats.running", label: "running" },
          { accessor: "stats.jumping", label: "jumping" },
          { accessor: "stats.swimming", label: "swimming" },
          { accessor: "stats.weapons.blades.short", label: "katana" },
        ]}
      />
```

## [publishing to npm](https://github.com/tigawanna/ReactDevsKe-Meetup-February-2025/blob/78603b810685ad9dbdb6ed6e01dbe96ae62a9a1e/my-table-package)

Publishing to npm requires 3 things 
- a nodejs project
- a package.json file
. an npm account

 in our case we also need 
 - tsconfig for typescript
 - tsup for transpiling (we could use tsc for this too)
  
 create a node project

```bash
npm init -y
npm install typescript --save-dev
tsc --init
``` 

we'll change the tsconfig to look like this [source + explanation](https://www.totaltypescript.com/tsconfig-cheat-sheet)

```json
{
  "compilerOptions": {
    /* Base Options: */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "verbatimModuleSyntax": true,

    /* Strictness */
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    /* If transpiling with TypeScript: */
    // "module": "NodeNext",
    "outDir": "dist",
    // "sourceMap": true,

    /* AND if you're building for a library: */
    "declaration": true,

    /* AND if you're building for a library in a monorepo: */
    // "composite": true,
    // "declarationMap": true,

    /* If NOT transpiling with TypeScript: */
    "module": "preserve",
    "noEmit": true,
    /* If your code doesn't run in the DOM: */
    // "lib": ["es2022"]
    /* If your code runs in the DOM: */
    "lib": ["es2022", "dom", "dom.iterable"],
    // if you want to use JSX (react)
    "jsx":"react-jsx",

    "paths": {
      "@/*": ["./src/*"]
    },
    
  },
  // only files under `src` will be transpiled
  "include": ["src"],
  // exclude files under `dist` and `node_modules`
  "exclude": ["dist", "node_modules"]
}
```

Our file will be in the `src` directory with an `index.ts`  file as the main entrypoint

>[!NOTE]
>  Entrypoint is the file that is executed when the package is imported

example
```ts
// my-table-package is the name of the package which is the default entrypoint
import { GenericTable } from "my-table-package";
```

entry points are defined in the `package.json` file

```json
{
  "name": "my-table-package",
  "version": "1.0.0",
  "type": "module",
  // our transipiled file will be in the `dist` directory
  "files": [
    "dist"
  ],
  // our entrypoint is the `index.ts` file
  "main": "dist/index.js",
  // the exports field is a newer syntax for node 16+ that allows for multiple entrypoints
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    // we can also define exports for specific files
    "/styles":"./dist/index.css"
  },
  // peer dependencies are dependencies that we expect the user of the package to already have installed , if we're unsure that thy'll have it we put it i the dependencies field (it might lead to bigger final size)
    "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "tailwindcss": "^3.0.0 || ^4.0.0",
    "daisyui": " ^4.0.0 || ^5.0.0-beta"
  },
  // devDependencies are dependencies that are only used for development and don't get included in the final package
  // if uo have peer dependencies u can put them in dev dependencies
  "devDependencies": {
    "@arethetypeswrong/cli": "^0.17.3",
    "@changesets/cli": "^2.27.12",
    "@eslint/js": "^9.19.0",
    "@types/node": "^22.12.0",
    "@types/react": "^19.0.8",
    "daisyui": "5.0.0-beta.6",
    "eslint": "^9.19.0",
    "prettier": "^3.4.2",
    "react": "^19.0.0",
    "tailwindcss": "^4.0.1",
    "tsup": "^8.3.6",
    "typescript": "^5.7.3"
  }
}
```
We'll build this package using tsup . we can use `tsc (the typescript compiler)` to build the package but that would require some changes

```json 
//tsconfig.json
{
   /* If transpiling with TypeScript: */
    "module": "NodeNext",
    "sourceMap": true,
}
```

which requires that all our import should end with the file extension name 

```ts
import { GenericTable } from "./src/components/GenericTable";
// to be 
import { GenericTable } from "./src/components/GenericTable.js";
```
which can be a bit much if we already have the code we want to publish
to use tsup we just add a config 

```ts
//tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts","src/components/RedSquare.tsx"],
  splitting: false,
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  minify: false,
  platform: "browser", 
});

```
 and with our build script
 
```json
{
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup",
    "format": "prettier --write .",
    "typecheck": "tsc",
    "lint": "eslint --quiet .",
    "ci:version": "changeset version",
    "ci:release": "changeset publish",
    "release": "changeset publish --no-git-checks",
    "check-exports": "attw --pack . --ignore-rules=cjs-resolves-to-esm --profile node16"
  }
}
```

```sh
npm run build
```

the outputs should be in the `dist` directory
and tio test if our component works (am using pnpm)
we check the working directory using `pwd` then head to the project we want to install the package in and run

```sh
 pnpm install <file-path-to-package>
```
which adds a linked package like this 

```json
  "dependencies": {
    "@tailwindcss/vite": "^4.0.1",
    //locally linked package
    "my-table-package": "link:/home/dennis/Desktop/packaging/my-table-package",
    "pp": "^1.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.1"
  }
```

>[!NOTE] 
if u're not using pnpm u can use `npm link` instead of `pnpm install`

>[!WARNING] 
This will only work if you build yoour project locally where the package project also is , if you ad this to a projecct that get's build in CI or any other machnie it will not work

to make it usable by everyone we publish it to npm using 
```sh
npm publish
```

>[!NOTE]
 once at least one project installs your library it will be 
 undeletable from the npm registry

### Extras
- check exports with [are the types correct](https://github.com/arethetypeswrong/arethetypeswrong.github.io#readme)
to chek if everything is being exported correctly

```json
{
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup",
    "format": "prettier --write .",
    "typecheck": "tsc",
    "lint": "eslint --quiet .",
    "ci:version": "changeset version",
    "ci:release": "changeset publish",
    "release": "changeset publish --no-git-checks",
    "check-exports": "attw --pack . --ignore-rules=cjs-resolves-to-esm --profile node16"
  }
}
```
```sh
npm run check-exports
```

- [create a changelog](https://blog.logrocket.com/automatically-generate-and-release-a-changelog-with-node-js/)
- write unit tests
- use other entrypoint , useful for
   
  - optimize and minimize the bundle size by allowing tree-shaking
  - separate and organize code into logical modules for better maintainability
  - enable independent development and testing of different components
  - facilitate conditional loading of features based on environment or user preferences
  - improve application startup time by loading only necessary code
  - enhance code reuse across different parts of the application or projects

example 
```ts
// /src/inde: main entrypoint contents

import { GenericTable } from "./components/GenericTable";
import { GenericTableWithNestedFields } from "./components/GenericTableWithNestedFields";
import { HardCodedTable } from "./components/HardCodedTable";
 
export {
  GenericTable,
  GenericTableWithNestedFields,
  HardCodedTable
};
```
```ts
import { defineConfig } from "tsup";

export default defineConfig({
  // our entrypoint is the `index.ts` file
  // RedSquare.tsx component will be build with it's own entrypoint
  entry: ["src/index.ts","src/components/RedSquare.tsx"],
  splitting: false,
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  minify: false,
  platform: "browser",
  
});

```

```json
{
      "exports": {
      // default entrypoint  
      ".": {
        "import": "./dist/index.js",
        "require": "./dist/index.cjs"
      },
      //  /redbox entrypoint
      "./redbox": "./dist/components/RedSquare.js"
    },
}
```

```ts
// import the default entrypoint
import { GenericTable } from "my-table-package";
// import the redbox entrypoint
import { RedBox} from "my-table-package/redbox";
```

## The end
