/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import React from 'react';
import { Route } from 'react-router';
import markdownFactory from 'markdown-it';
import hljs from 'highlight.js';

import App from '../App';
import ReactFragment from '../utils/ReactFragment';
import NotFound from '../NotFound';

import '../../node_modules/highlight.js/styles/atom-one-dark.css';

const markdown = markdownFactory({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});

/* eslint-disable */
export default (
  <Route path="/" component={App}>
    <Route path="tests" component={ReactFragment} >
      {
        Object.keys(allTestedFiles).map(dir => {
          return (
            <Route path={`${dir}`} >
              {
                Object.keys(allTestedFiles[dir]).map(fileName => {
                  const { fileLinkInReactRepo, fileContent } = allTestedFiles[dir][fileName];

                  return (
                    <Route
                      path={`${fileName.slice(0, -3)}`}
                      component={() => {
                        const main = require(`../tests/${dir}/${fileName}`).default;
                        main();

                        setTimeout(() => document.querySelector('code[class*="language"]').className += ' hljs');

                        return (
                          <div>
                            <a
                              className="test-link-react"
                              target="_blank"
                              href={`https://www.${fileLinkInReactRepo.slice(1, -1)}`}
                            >
                              click me to corresponding test unit in react repo
                            </a>

                            <div
                              className="code-wrap"
                              dangerouslySetInnerHTML={{__html: markdown.render(
                                "```jsx\n" + fileContent + "\n```"
                              )}}
                            >
                            </div>
                          </div>
                        );
                      }}
                    />
                  );
                })
              }
            </Route>
          );
        })
      }
    </Route>

    <Route path="*" component={NotFound} />
  </Route>
);
