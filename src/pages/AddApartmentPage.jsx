/**
 * @file Route `/add_apartment` — the form for publishing a listing.
 *
 * The form is data-driven: {@link SECTIONS} describes the fields, and the JSX
 * renders whatever is in it. To add or reorder a field, edit that array rather
 * than the markup.
 *
 * A published listing goes into `localStorage` via `addListing` and appears at
 * the top of the grid. There is no server, so it is visible only in this browser.
 *
 * Exports: {@link AddApartmentPage} (default).
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/Page";
import { Button } from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import styles from "./AddApartmentPage.module.css";

/**
 * Empty form values. Note there is no `id`: it is minted once at submit, not
 * carried in form state, because regenerating it per keystroke was a bug.
 */
const initialState = {
  name: "",
  country: "",
  city: "",
  neighbourhood: "",
  space: "",
  bathrooms: "",
  bedrooms: "",
  price: "",
  review_scores_rating: "",
  accommodates: "",
  property_type: "",
  host_name: "",
  picture_url: { url: "" },
};

// Number inputs hand back strings; the bundled listings store these as numbers.
const NUMERIC_FIELDS = [
  "price",
  "accommodates",
  "bedrooms",
  "bathrooms",
  "review_scores_rating",
];

/**
 * The form, as data. Each section becomes a `<fieldset>`; each field becomes a
 * labelled input. Anything beyond `name` and `label` is spread straight onto the
 * `<input>`, so `type`, `min` and `max` here are ordinary HTML attributes and
 * the browser does the validation.
 *
 * Fields are `required` unless marked otherwise. The description is a
 * `<textarea>` and is rendered separately, below this list.
 *
 * @type {{title: string, hint: string, fields: object[]}[]}
 */
const SECTIONS = [
  {
    title: "The place",
    hint: "How it appears on the listing card.",
    fields: [
      { name: "name", label: "Listing title", placeholder: "Piso Cava Alta, Plaza Mayor" },
      { name: "property_type", label: "Property type", placeholder: "Entire apartment" },
      { name: "picture_url", label: "Photo URL", placeholder: "https://example.com/photo.jpg", type: "url" },
    ],
  },
  {
    title: "Where it is",
    hint: "Search matches on city and country.",
    fields: [
      { name: "city", label: "City", placeholder: "Cadaqués" },
      { name: "country", label: "Country", placeholder: "Spain" },
      { name: "neighbourhood", label: "Neighbourhood", placeholder: "Carrer del Tro", required: false },
    ],
  },
  {
    title: "The details",
    hint: "Shown on the listing page.",
    fields: [
      { name: "price", label: "Price per night (€)", placeholder: "200", type: "number", min: 0 },
      { name: "accommodates", label: "Sleeps", placeholder: "8", type: "number", min: 1 },
      { name: "bedrooms", label: "Bedrooms", placeholder: "4", type: "number", min: 0 },
      { name: "bathrooms", label: "Bathrooms", placeholder: "2", type: "number", min: 0 },
      { name: "review_scores_rating", label: "Score out of 100", placeholder: "92", type: "number", min: 0, max: 100 },
      { name: "host_name", label: "Host name", placeholder: "Kiowa & Al" },
    ],
  },
];

/**
 * The publish-a-listing page.
 *
 * @param {object} props
 * @param {(listing: object) => void} props.addListing Persists the new listing.
 * @returns {JSX.Element}
 *
 * @sideeffect On submit: persists the listing and navigates to `/properties`.
 */
const AddApartmentPage = ({ addListing }) => {
  const [dataForm, setDataForm] = useState(initialState);
  const navigate = useNavigate();
  useScrollToTop();
  useDocumentTitle("List your place");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDataForm((current) =>
      name === "picture_url"
        ? { ...current, picture_url: { url: value } }
        : { ...current, [name]: value },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // The id is minted once, here. It used to be regenerated on every
    // keystroke, so a listing ended up with whatever the last keypress produced.
    addListing({
      ...dataForm,
      ...Object.fromEntries(
        NUMERIC_FIELDS.map((field) => [field, Number(dataForm[field])]),
      ),
      id: crypto.randomUUID(),
    });
    setDataForm(initialState);
    navigate("/properties");
  };

  const valueFor = (name) =>
    name === "picture_url" ? dataForm.picture_url.url : dataForm[name];

  return (
    <Page>
      <header className={styles.header}>
        <h1 className={styles.title}>List your place</h1>
        <p className={styles.lede}>
          It appears in the grid straight away and stays there between visits.
        </p>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        {SECTIONS.map(({ title, hint, fields }) => (
          <fieldset key={title} className={styles.section}>
            <legend className={styles.legend}>{title}</legend>
            <p className={styles.hint}>{hint}</p>

            <div className={styles.fields}>
              {fields.map(({ name, label, required = true, ...input }) => (
                <label key={name} className={styles.field}>
                  <span className={styles.label}>{label}</span>
                  <input
                    className={styles.input}
                    name={name}
                    type="text"
                    value={valueFor(name)}
                    onChange={handleInput}
                    required={required}
                    {...input}
                  />
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <fieldset className={styles.section}>
          <legend className={styles.legend}>Description</legend>
          <p className={styles.hint}>What makes the place worth the trip.</p>
          <label className={styles.field}>
            <span className={styles.label}>About this place</span>
            <textarea
              className={styles.textarea}
              name="space"
              rows={5}
              value={dataForm.space}
              onChange={handleInput}
              placeholder="A whitewashed loft two streets back from the water, with a roof terrace that catches the evening light."
              required
            />
          </label>
        </fieldset>

        <div className={styles.actions}>
          <Button type="submit">Publish listing</Button>
        </div>
      </form>
    </Page>
  );
};

export default AddApartmentPage;
