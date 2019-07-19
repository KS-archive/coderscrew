# Button

<!-- STORY -->

### Available props

| Name    | Type                              | Default value | Description                                                                    |
| ------- | --------------------------------- | ------------- | ------------------------------------------------------------------------------ |
| as      | `elementType\|string`             | `"button"`    | Type of the element that will be rendered as a button                          |
| color   | `string`                          | `''`          | Color of the button background or text (depends on the button variant)         |
| size    | `'small'\|'default'\|'large'`     | `'default'`   | Size of the button                                                             |
| kind    | Palette color                     | `'primary'`   | Name of the color of button background or text (depends on the button variant) |
| variant | `'contained'\|'outlined'\|'text'` | `'contained'` | Layout of the button                                                           |

You can also provide all of the properties that can be provided to the native `<button>` element (or another element provided in `as` property).
