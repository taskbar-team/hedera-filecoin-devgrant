import React from 'react';
import { TabsWrapper, TabWrapper } from './tabbedContent.styles'

export type Tab = {
    label: React.ReactNode;
    content: React.ReactNode;
}

type Props = {
    tabs: Array<Tab>,
    activeTabIndex: number,
    onChange: (index: number) => void,
}

const Tabs: React.FC<Props> = (props) => {
    const renderTabs = () =>
        props.tabs.map((tab, index) => tab &&
            <TabWrapper
                className={(props.activeTabIndex === index ? "active" : "") + (!tab.content ? " empty" : "")}
                onClick={() => props.onChange(index)}
                key={"tab_" + index}>
                {tab.label}
            </TabWrapper>)

    return <TabsWrapper>
        {renderTabs()}
    </TabsWrapper>
}

export default Tabs;
