import { Selector } from "testcafe";
import { url, objectSelectorButton, propertyGridSelector, expandButtonSelector, setJSON, takeElementScreenshot, wrapVisualTest, pageNavigator, getListItemByText } from "../../helper";
import { largeSurvey } from "./surveys/large-survey";

const title = "Sidebar Screenshot";

fixture`${title}`.page`${url}`;

test("object selector popup", async (t) => {
  await wrapVisualTest(t, async (t, comparer) => {
    await setJSON({ pages: [{ name: "page1" }] });
    await t
      .resizeWindow(750, 700)
      .click(expandButtonSelector)
      .click(objectSelectorButton);

    await takeElementScreenshot("side-bar-object-selector.png", propertyGridSelector, t, comparer);
    await t.resizeWindow(1920, 900);
  });
});

test("object selector with search and selected item", async (t) => {
  await wrapVisualTest(t, async (t, comparer) => {
    const objectSelectorContent = ".sv-popup.svc-object-selector .sv-popup__body-content";

    await setJSON(largeSurvey);
    await t
      .resizeWindow(1280, 900)
      .click(pageNavigator)
      .click(getListItemByText("educationalNeeds"))
      .click(Selector(".svc-string-editor__input").withText("Do you live?"))

      .click(objectSelectorButton)
      .wait(1000);

    await takeElementScreenshot("side-bar-object-selector-with-selected-item.png", objectSelectorContent, t, comparer);
    await t.resizeWindow(1920, 900);
  });
});
test("object selector with large object's name", async (t) => {
  await wrapVisualTest(t, async (t, comparer) => {
    const sideBarActionsContainer = Selector(".svc-side-bar__container-actions");
    await setJSON({
      "pages": [
        {
          "name": "page1",
          "elements": [
            {
              "type": "text",
              "name": "very_long_long_long_long_long_long_long_long_name"
            }
          ]
        }
      ]
    });
    await t
      .resizeWindow(1920, 1080)
      .click(Selector(".svc-question__content"), { offsetX: 10, offsetY: 10, })
      .click(Selector(".svc-question__content"), { offsetX: 10, offsetY: 10, });

    await takeElementScreenshot("side-bar-object-selector-with-big-name.png", sideBarActionsContainer, t, comparer);
    await t.resizeWindow(1920, 900);
  });
});