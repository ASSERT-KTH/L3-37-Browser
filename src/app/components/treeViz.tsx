import React from 'react';
import { Tabs, Slider } from 'antd';
import TreeView from './tree.view';

const TabPane = Tabs.TabPane;



export const TreeViz: React.FC = ({ }): JSX.Element => {

    return (
        <div className="card-container">
            <Tabs tabPosition='top' className='tabs-container' type="card">
                <TabPane className='main-container blending' forceRender key="1"
                    tab={
                        <Slider
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={e => this.setState({ opacity: e })}
                            value={this.state.opacity}
                            style={{ minWidth: 100 }
                            } />}>

                    <TreeView style={{ opacity: 1 - this.state.opacity }} url={this.state.url} />
                </TabPane>
            </Tabs>
        </div>
    )
}