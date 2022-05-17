import "./styles.css";
import { TreeList } from "./components/TreeList";
import { TreeListConfig } from "./constants/TreeList.config";

export default function App() {
  return (
    <div className="App">
      <TreeList config={TreeListConfig} />
    </div>
  );
}
