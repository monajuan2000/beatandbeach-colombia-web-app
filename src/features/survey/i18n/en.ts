export const surveyEn = {
    emailSubmission: {
        subject: 'New response · Guatapé cultural interpretation',
        other: 'Other',
        yes: 'Yes',
        no: 'No',
        languageValue: 'English',
        fields: {
            fullName: 'Participant name',
            email: 'Participant email',
            profession: 'Profession or occupation',
            consent: 'Data processing authorization',
            language: 'Form language',
            submittedAt: 'Submitted at',
        },
    },
    callout: {
        eyebrow: 'Academic survey',
        duration: '8–10 min',
        cta: 'Answer the survey',
    },
    page: {
        eyebrow: 'Academic research',
        researchLabel: 'Research:',
    },
    form: {
        participantTitle: 'About you',
        participantDescription: 'Your personal data will be kept confidential.',
        fullName: 'Full name',
        email: 'Email address',
        profession: 'Profession or occupation',
        consent:
            'I authorize the processing of my personal data for academic purposes only, in accordance with Colombian Law 1581 of 2012, and I confirm that I am of legal age or have my guardian’s permission.',
        sectionLabel: (number: number) => `Block ${number}`,
        required: 'Required',
        optional: 'Optional',
        other: 'Other',
        otherPlaceholder: 'Please specify',
        selectAll: 'Select all that apply.',
        openPlaceholder: 'Write your answer here…',
        progress: (answered: number, total: number) => `${answered} of ${total} questions answered`,
        submit: 'Send my responses',
        sending: 'Sending…',
    },
    errors: {
        required: 'Please answer this question.',
        other: 'Please specify your answer.',
        fullName: 'Please enter your full name.',
        email: 'Please enter a valid email address.',
        duplicateEmail: 'This email address has already submitted this survey from this browser.',
        profession: 'Please enter your profession or occupation.',
        consent: 'Please accept the data policy to continue.',
        summary: (count: number) =>
            `${count} ${count === 1 ? 'field needs' : 'fields need'} your attention before sending.`,
        submit: 'We couldn’t send your responses. Check your connection and try again.',
    },
    success: {
        tag: 'Responses sent',
        title: (firstName: string) => `Thank you, ${firstName}!`,
        body: 'Your answers were sent successfully and will help strengthen the cultural interpretation of Guatapé.',
    },
}

export type SurveyMessages = typeof surveyEn
