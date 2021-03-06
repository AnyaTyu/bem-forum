block('issue').content()((node, ctx) => {
    const { block, i18n, data } = node;
    const issue = ctx.issue;
    const user = data.user || {};
    const isPostPage = data.url.pathname.match(/\/\d+/);

    return [
        {
            elem: 'header',
            content: [
                // TODO: maybe better to avoid element for one
                //       action and resolve it on actions level
                issue.user.id === user.id && {
                    elem: 'actions',
                    content: [
                        {
                            block: 'button',
                            text: 'edit',
                            mix: { block, elem: 'edit-button' },
                            js: {
                                issueId: issue.number
                            }
                        },
                        {
                            block,
                            elem: 'toggle-resolved',
                            mix: { block: block, elem: 'actions-button' },
                            issue: {
                                number: issue.number,
                                state: issue.state
                            }
                        }
                    ]
                },
                {
                    elem: 'date',
                    content: issue.created_from_now
                },
                {
                    elem: 'title',
                    content: [{
                        block: 'icon',
                        mods: { bg: 'check-circle' },
                        mix: [
                            { block, elem: 'icon-resolved' },
                            { block, elem: 'title-icon' }
                        ]
                    }, {
                        block: 'link',
                        mix: { block, elem: 'header-link' },
                        url: data.pathPrefix + '/' + issue.number + '/',
                        content: issue.title
                    }]
                },
                {
                    block: 'user',
                    mix: { block, elem: 'user' },
                    user: issue.user
                },
                issue.labels.length ? {
                    block: 'labels-list',
                    mods: { inline: true },
                    mix: { block, elem: 'labels-list' },
                    labels: issue.labels
                } : ''
            ]
        },
        {
            elem: 'content',
            content: [
                {
                    block: 'md-body',
                    content: issue.html,
                    mix: { block, elem: 'content-body' }
                },
                {
                    block: 'button',
                    mods: {
                        disabled: isPostPage
                    },
                    mix: { block: 'issue', elem: 'comments-button' },
                    js: { number: issue.number },
                    text: issue.comments ?  `${i18n('issue', 'comments')}: ${issue.comments}` : i18n('issue', 'leaveComment')
                }
            ]
        },
        {
            elem: 'footer',
            content: !isPostPage ? '' : {
                block: 'comments',
                issueId: issue.number
            }
        }
    ];
});
