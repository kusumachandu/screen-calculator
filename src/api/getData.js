import axios from "axios";
import { units } from "../utils/panelData";

export default async function getData(
  ratio1,
  unit1,
  vertical1,
  horizontal1,
  Id1,
  title1,
  type1,
  panels1,
  activePanel1,
  screenName1,
  baseURL,
  parentId,
  navigate,
  currentState,
  updateState
) {

  const { Id, ratio, unit, type, panelIds } = currentState;
  const { setRatio, setUnit, setPanelsX, setPanelsY, setType, setTitle, setScreenName, setPanelData, setVertical, setId, setp } = updateState;

  let sendID;

  if (Id1 === "") {
    sendID = Id;
  } else {
    sendID = Id1;
  }

  try {
    const response = await axios.post(baseURL, {
      unit: unit1.unit,
      ratio: ratio1,
      horizontal: horizontal1,
      vertical: vertical1,
      id: sendID,
      title: title1,
      product: type1,
      panelMatrix: panels1,
      activePanel: activePanel1,
      screenName: screenName1,
      parentId: parentId,
    });

    //   Avoid updating ratio and unit unless they differ from the current state
    if (response.data.ratio !== ratio) setRatio(response.data.ratio);
    const updatedUnit = units.filter(
      (data) => data.unit === response.data.unit
    );
    if (updatedUnit && updatedUnit.unit !== unit.unit)
      setUnit(updatedUnit[0]);

    setPanelsX(response.data.panelsX);
    setPanelsY(response.data.panelsY);

    if (response.data.product && response.data.product !== type) {
      setType(response.data.product);
    }
    //   setPanels(response.data.panelMatrix);
    setTitle(response.data.title);
    setScreenName(response.data.screenName);
    setPanelData(response.data);
    if (response.data.ratio !== ratio) {
      setVertical(Math.round(Number(response.data.vertical.split(" ")[0])));
    }

    if (Id) {
      setId(Id);
      navigate(`/${Id}`);
    } else if (response.data.id) {
      if (parentId) {
        if (!panelIds.includes(response.data.id)) {
          setp([...panelIds, response.data.id]);
        }
      }
      setId(response.data.id);
      navigate(`/${response.data.id}`);
    }
    //   initialLoad.current = false;
  } catch (error) {
    console.log(error);
  }
}