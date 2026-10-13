# Experiment 1: HTML5 Elements Demonstration

**Course:** Backend Development

**Student:** Kabir Chaudhary

**Roll number:** 590015728
**Experiment page:** `parta/index.html`

## 1. Aim

To create a web page that demonstrates commonly used HTML5 elements and shows how they can be organized, styled, and used for text, lists, media, forms, tabular data, semantic content, and measurement indicators.

## 2. Learning objectives

- Structure a document using the HTML5 doctype and standard page regions.
- Use text-formatting, list, media, form, table, and semantic elements.
- Connect navigation links to sections within the same page.
- Apply CSS selectors and layout rules to style the document and its controls.
- Identify which media and form features need additional files or server-side processing.

## 3. Tools and technologies

- **HTML5:** Provides the page structure and demonstration elements.
- **CSS3:** Embedded in the document's `<style>` element to control presentation.
- **Web browser:** Renders the page and provides native form controls, disclosure behavior, and media controls.

The experiment is implemented in one file, `parta/index.html`. The page does not include a JavaScript file, a stylesheet file, or a backend service.

## 4. Page structure and metadata

- `<!DOCTYPE html>` declares an HTML5 document.
- `<html lang="en">` sets the document language to English.
- The `<head>` contains:
  - A UTF-8 character encoding declaration.
  - A viewport setting for responsive behavior on mobile devices.
  - A description meta tag identifying the page as an HTML5 elements demonstration.
  - An author meta tag whose value is the placeholder `Your Name`.
  - The browser tab title, `HTML5 Complete Elements Demo`.
  - An embedded `<style>` block with the page's CSS.
- `<body>` contains all visible page content.
- `<header>` presents the main heading and introductory sentence.
- `<nav>` provides links to the page's main demonstration sections.
- `<main>` groups the primary content.
- `<section>` elements organize the content by topic.
- `<footer>` displays a copyright statement and educational-purpose note.

## 5. In-page navigation

The navigation contains links to the `text`, `lists`, `media`, `forms`, `table`, and `semantic` sections. Each link uses a fragment such as `href="#text"` that matches the `id` of its target section. Selecting a link moves the browser to that section without opening a separate page.

## 6. Text-formatting elements

The **Text Formatting Elements** section demonstrates:

- `<strong>` for strong importance and `<em>` for emphasis.
- `<b>` and `<i>` for stylistic bold and italic text.
- `<u>` for underlining and `<s>` for text that is no longer accurate or relevant.
- `<mark>` for highlighted text and `<small>` for side comments or fine print.
- `<sub>` and `<sup>` for subscript and superscript.
- `<code>` for a fragment of computer code.
- `<blockquote>` for a longer quotation.
- `<abbr>` with a `title` attribute to provide the expansion of an abbreviation.
- `<address>` for contact information.
- `<cite>` for the title of a creative work.
- `<dfn>` to mark a term being defined.
- `<kbd>` for keyboard input and `<samp>` for sample program output.
- `<time>` with a machine-readable `datetime` value.
- `<var>` for a variable name.
- `<p>` to group text into paragraphs.

These examples show different kinds of meaning and presentation. Elements such as `<strong>` and `<em>` communicate importance or emphasis, while `<b>` and `<i>` are primarily stylistic.

## 7. List elements

The **List Elements** section compares three list types:

- `<ul>` with `<li>` for an unordered list of items.
- `<ol>` with `<li>` for an ordered sequence.
- `<dl>` with `<dt>` terms and `<dd>` descriptions for term-definition pairs.

The examples use generic items and HTML/CSS term descriptions to demonstrate the structures.

## 8. Media elements

The **Media Elements** section demonstrates:

- `<img>` with `src` and descriptive `alt` text for an image.
- `<figure>` to group an image with a `<figcaption>` caption.
- `<audio controls>` and a nested `<source>` with an MPEG media type.
- `<video controls>` with width and height attributes and a nested MP4 `<source>`.

The two image examples refer to placeholder images hosted at `via.placeholder.com`. The audio and video controls refer to `audio.mp3` and `video.mp4`, respectively. Those media files are not present in the Exp 1 folder, so the controls are examples and playback requires adding the referenced files or updating their source paths. Fallback text is provided for browsers that do not support the audio or video element.

## 9. Form elements

The **Form Elements** section demonstrates labels and a variety of native HTML form controls:

- A text input for a name and an email input; both are marked `required`.
- A password input.
- A number input for age with a minimum of 1 and maximum of 100.
- Date, color, range, and file inputs.
- A country `<select>` with a prompt and options for the USA, UK, and India.
- Two radio buttons for gender. Their shared `name="gender"` makes them a mutually exclusive group.
- A checkbox for agreement to the terms.
- A `<textarea>` for a message, configured for five rows.
- A submit button and a reset button.
- `<label for="...">` associations that connect the labels to controls with matching `id` values.

The browser can apply native validation to the required name and email fields, and the email input uses the browser's email-format checks. The form has no configured server endpoint or application code to process or store submitted values; it demonstrates the controls rather than implementing a data-submission service.

## 10. Table element

The **Table Element** section displays three sample records using:

- `<table>` as the table container.
- `<thead>` for the column headings: Name, Email, and Country.
- `<tbody>` for three example rows.
- `<tr>` for each row, `<th>` for headings, and `<td>` for data cells.
- `<tfoot>` for a summary row.
- `colspan="3"` to make the summary cell span all three columns.

The values are static examples, not data loaded from a database.

## 11. Semantic elements and disclosure

The **Semantic Elements** section demonstrates:

- `<article>` for a self-contained article-like composition.
- `<aside>` for supplementary sidebar content.
- `<details>` and `<summary>` for a browser-native expandable disclosure. The paragraph inside the details element is revealed when the summary is activated.

These elements describe the role of their content and provide more meaningful document structure than generic containers alone.

## 12. Progress and meter elements

The final content section demonstrates two visual indicators:

- `<progress>` with a value of 70 and a maximum of 100, accompanied by a `70%` text label.
- `<meter>` with a value of 6 in a range from 0 to 10.

The values are fixed examples; the page does not update them dynamically.

## 13. CSS and presentation

The page's CSS is embedded in the `<style>` element in the document head. It demonstrates element and grouped selectors, descendant selectors, attribute selectors, and pseudo-classes.

- **Base page:** Uses Arial or a sans-serif fallback, a line height of 1.6, 20-pixel page padding, no body margin, and a light gray background.
- **Header and footer:** Use a dark background, white text, padding, and centered text. The header has spacing below it; the footer has spacing above it.
- **Navigation:** Uses a darker gray background and padded links. The links are white, spaced horizontally, and lose their underline by default; the `:hover` rule underlines them.
- **Main content:** Uses a white background, internal padding, and rounded corners.
- **Sections:** Have vertical spacing, a light border, and internal padding.
- **Headings:** The `h1`, `h2`, and `h3` elements share a dark text color.
- **Tables:** Occupy the available width and use collapsed borders. Header and data cells have borders and padding, and header cells have a light gray background.
- **Forms and controls:** Forms have a light background, padding, and rounded corners. Inputs, textareas, and selects are full width with consistent padding and spacing. Radio buttons, checkboxes, color/range controls, and file inputs are exempted from the full-width rule.
- **Buttons:** Use a dark background, white text, padding, rounded corners, and a pointer cursor. Their background changes on hover.
- **Images:** Are limited to the width of their container and retain their aspect ratio.
- **Figures:** Receive vertical spacing.
- **Progress and meter controls:** Are styled to fill the available width and have a set height.

## 14. Expected result

When opened in a browser, the page presents a single long, styled demonstration with six in-page navigation links and sections for text formatting, lists, media, forms, a table, semantic elements, and progress/meter controls. Native browser behavior is available for the form controls, disclosure element, and media controls. Media playback depends on the referenced media files being supplied.

## 15. Conclusion

This experiment demonstrates how HTML5 elements can represent different kinds of page content and how CSS can style those elements. It covers document structure, text semantics, lists, media, user-input controls, tabular data, semantic regions, and measurement indicators. It also illustrates the distinction between a front-end form demonstration and a complete application: processing submitted data requires additional server-side functionality.

----

[Experiment 1](https://kaveerchaudhary-cpu.github.io/Backend-development-/backend%20deveploment/lab/Exp%201/)
