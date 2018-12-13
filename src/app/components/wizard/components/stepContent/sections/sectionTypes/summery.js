import React, { Component } from 'react'
import {map} from 'lodash'
import { Tree } from 'antd';
import Summaryobject from "./summaryObject"
import { get } from 'lodash';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

export class summery extends Component {
  state={
    data:null
  }
     onSelect = (s, b) => {
       this.setState({data: get(b.node, 'props.data')})
    };
  
    onExpand = () => {
    };

  render() {
    const wizardData={
      owners: {
        owner: {
          name: 'test',
          age: 10
        },
        wakel: {
          name: 'test',
          age: 10
        }
      },
      conract: {
        owner: {
          name: 'test',
          age: 10
        },
        wakel: {
          name: 'test',
          age: 10
        }
      }
    }
    const {data} = this.state;
    return (
      <section className="summary">
      <DirectoryTree
      multiple
      onSelect={this.onSelect}
      onExpand={this.onExpand}
    >
    {map(wizardData,(val,index)=>(
              <TreeNode title={index} key={index}>
              {map(val,(v,d)=>(
                <TreeNode title={d} key={`${index}-${d}`} isLeaf data={v} />
              ))}
               </TreeNode>   
    ))}
           </DirectoryTree>
           {data!=null && <Summaryobject data={data}/>}
      </section>

      
    )
  }
}

