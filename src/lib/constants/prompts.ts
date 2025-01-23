export const ANONYMIZE_PROMPT = JSON.stringify(`
		Your task is to make some text anonymous.
		The text would be the resume, a CV, or a cover letter of a person in most cases.
		The text might contain various personal information such as names of people, addresses, phone numbers, email addresses, dates of birth, and so on.
		Your task is to rewrite the text in a way that it is doesnot contain any personal information.
		You should not remove the following information: professional information, relevant skills, years of experience, companies or jobs worked in, names of those companies, teams, or organizations, projects worked on during the job, client info mentioned in the text for the jobs worked on, other profession experiences, internships, projects, certifications, and education.
		Donot remove the names of the workplaces or the companies worked in.
		The meaning of the text should be preserved, but any personal information should be removed.
		You should also ensure that the text is grammatically correct and easy to understand.
		No information should be added or removed except for the anonymization.
		The resultant text must be plain text and in the same language as the original text.
		Given the text is a resume, a CV, or a cover letter, the resultant text should also be the same.
		The anonymized text should not have any mention of any personally identifying information.
		It should not contain any placeholders or dummy data.
		It should not hold tags like [Your Name] or [Your Address] or anything like that.
		Stuff like that will be removed.
		The final output must only contain the anonymized text and nothing else.
	`);

export const SUMMARIZE_PROMPT = JSON.stringify(`
		You will be given some text.
		The text will be a resume, a CV, or a cover letter.
		Your task will be summarize anything that is redundant, elaborate upon the most important points, and provide clarity where necessary.
		You should also ensure that the text is grammatically correct and easy to understand.
		If the description of a given skill or experience in the resume is too short or lacks detail or clarity, you can expand upon it.
		If it is too long or contains too much information, you can summarize it.
		If words or spelling are wrong, you can fix them. Same for monospacing between words and letters.
		The resultant text must be plain text and in the same language as the original text.
		Given the text is a resume, a CV, or a cover letter, the resultant text should also be the same.
		Only professional information, relevant skills, experiences, projects, certifications, and education should be included.
		Information should be presented in either a paragraph or as bullet points as appropriate.
		The final output must only contain the required text and nothing else.
	`);

export const REFORMAT_PROMPT = JSON.stringify(`
		Your task is to reformat some text.
		The text would be the resume, a CV, or a cover letter of a person in most cases.
		Your job is to reformat the plain text to rich text.
		If some words are written weirdly, you can fix them. Same for spacinf between words and letters.
		Add styles, colors, fonts, line breaks, and other formatting to the text where necessary and appropriate.
		You should also ensure that the text is grammatically correct and easy to understand.
		The text also must have proper spacing and capitalization.
		No information should be added or removed except for the reformatting.
		Select a proper font size and font family for the text from the context and style it accordingly.
		Available fonts are Andale Mono, Arial, Arial Black, Book Antiqua, Comic Sans MS, Courier New, Georgia, Helvetica, Impact, Symbol, Tahoma, Terminal, Times New Roman, Trebuchet MS, Verdana, Webdings, Wingdings.
		Select the font most suitable for the text.
		The resultant text must be rich text and not markdown.
		Rich text works on html like syntax and can even include css.
		For e.g., bold is <b>bold</b>, italic is <i>italic</i>, underline is <u>underline</u>, and so on.
		The rich text can be styled by using the style attribute like <b style="color:red">bold red</b> but it should not be wrapped in any backticks like markdown either. Avoid using colors whenever possible but if needed if you can do so.
		You can aslo put horizontal rules by using the <hr> tag. Text can similarly be formatted and aligned using the style attributes like in css.
		You can choose the font size and family by styling the text with the style attribute like in css.
		You can also color or underline the text by using the style attribute like in css.
		Do so only if required and not unnecessarily.
		You can add the data-mce-style attribute to tags with the style attribute to apply the css style to the tag.
		The final response must contain only the reformatted text and nothing else. Donot wrap the output in any backticks like markdown either.
	`);

export const TREE_OF_THOUGHT_PROMPT = (text: string) =>
    JSON.stringify(`
		Imagine three different experts are answering this question.
		They will all think through the question and share their different perspectives.
		The final output must be in the following JSON format and nothing else:
		{
			"thoughts": [
				{
					step: 1,
					solution: [
						{
							expert: 1,
							"thought": string,
							"reasonings": array of strings,
							"issues: array of strings
						},
						{
							expert: 2,
							"thought": string,
							"reasonings": array of strings,
							"issues: array of strings
						},
						{
							expert: 3,
							"thought": string,
							"reasonings": array of strings,
							"issues: array of strings
						},	
					]
				},
				{
					step: 2,
					solution: [
						{
							expert: 1,
							"thought": string,
							"reasonings": array of strings,
							"issues: array of strings
						},
						{
							expert: 2,
							"thought": string,
							"reasonings": array of strings,
							"issues: array of strings
						},
						{
							expert: 3,
							"thought": string,
							"reasonings": array of strings,
							"issues: array of strings
						},	
					]
				},	
				...
			],
			"finalAnswer": string
		}
		This includes the perspectives of the experts, the reasoning behind their thoughts, and any issues the solutions might have.
		The solution might involve one or more steps.
		All experts will write down 1 step of their thinking,
		then share it with the group.
		Then all experts will go on to the next step, etc.
		If any expert realises they're wrong at any point then they leave.
		The final answer must be the final solution to the question and must follow the instructions given the question to the best of your ability.
		The question is:
		${text}
	`);
