import * as React from "react";
import './Projects.css';

export interface IProps {
  name: string;
  enthusiasmLevel?: number;
}

export interface IProjectState {
  error: Error | null;
  isLoaded: boolean;
  items: any[];
}

class Projects extends React.Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    } as IProjectState;
  }

  public componentDidMount() {
    fetch("http://localhost:3000/data/projects.json")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            error,
            isLoaded: true
          });
        }
      );
  }

  public render() {
    const renderState: IProjectState = this.state as IProjectState;
    if (renderState.error) {
      return <div>Error: {renderState.error.message}</div>;
    } else if (!renderState.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {renderState.items.map(item => (
            <li key={item.name} className="flex">
              <div><strong>{item.name}</strong></div>
              <div>{item.customer}</div>
              <div className= {"status " +item.status}>{item.status}</div>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default Projects;
