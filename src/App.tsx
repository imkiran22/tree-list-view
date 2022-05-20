import "./styles.css";
import { TreeList } from "./components/TreeList";
import { TreeListConfig } from "./constants/TreeList.config";

export default function App() {
  return (
    <div className="App">
      <div className="inject-component">
        <TreeList config={TreeListConfig} />
      </div>
    </div>
  );
}
