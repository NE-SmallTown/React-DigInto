/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import React from 'react';
import { Link } from 'react-router';
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import animate from 'css-animation';

import 'rc-menu/assets/index.css';

function handleSelect (info) {
  console.log(info);
  console.log(`selected ${info.key}`);
}

function onOpenChange (value) {
  console.log('onOpenChange', value);
}

const animation = {
  enter (node, done) {
    let height;
    return animate(node, 'rc-menu-collapse', {
      start () {
        height = node.offsetHeight;
        node.style.height = 0;
      },
      active () {
        node.style.height = `${height}px`;
      },
      end () {
        node.style.height = '';
        done();
      }
    });
  },

  appear () {
    return this.enter.apply(this, arguments);
  },

  leave (node, done) {
    return animate(node, 'rc-menu-collapse', {
      start () {
        node.style.height = `${node.offsetHeight}px`;
      },
      active () {
        node.style.height = 0;
      },
      end () {
        node.style.height = '';
        done();
      }
    });
  }
};

export default class AppSideBar extends React.PureComponent {
  render () {
    /* eslint-disable */
    return (
      <Menu
        mode="inline"
        defaultOpenKeys={['1']}
        openAnimation={animation}
        onSelect={handleSelect}
        onOpenChange={onOpenChange}
      >
        {
          Object.keys(allTestedFiles).map(dir => {
            return (
              <SubMenu key={dir} title={<span>{dir}</span>} >
                {
                  Object.keys(allTestedFiles[dir]).map(fileName => {
                    const { menuTitle, fileLinkInReactRepo } = allTestedFiles[dir][fileName];

                    return (
                      <MenuItem key={`${dir}/${fileName}`}>
                        {/* TODO 下面用 a 标签 _blink，起一个 koa 的 server，把对应页面的 js 注入进行，现在这样有影响 */}
                        <Link to={`/tests/${dir}/${fileName.slice(0, -3)}`} title="click me to execute test">
                          {menuTitle}
                        </Link>
                      </MenuItem>
                    );
                  })
                }
              </SubMenu>
            );
          })
        }
      </Menu>
    );
  }
};
