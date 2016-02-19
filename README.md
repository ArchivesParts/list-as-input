# list-as-input
Angular directive which allow user to add multiple values in a single input


## HTML Usage


Example with default pattern (ie:string matching) and default separator (ie: ';')

```html
  <input list-input
         ng-model="counter"
         label="Counter lists"
         type="text"
         placeholder="Size"
         name="counter">
```

Example with custom pattern

```html
 <input list-input="match="^(\w+\d+)$" end-with=','"
         ng-model="emails"
         name="emails"
         label="Email list"
         type="text"
         placeholder="Email">
```



```html
  <input list-input
         ng-model="counter"
         egg-pattern="^\d+$"
         label="Counter lists"
         egg-end-with=";"
         type="text"
         placeholder="Size"
         name="counter">
```

Example with list values validation

```html
  <input list-input
         ng-model="counter"
         egg-value="['value1','value2','value3']"
         label="Counter lists"
         type="text"
         placeholder="Size"
         name="counter">
```

  
## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

