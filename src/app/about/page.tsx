import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-light-surface dark:bg-dark-surface text-gray-900 dark:text-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>
                            <h1>About AI-Powered CV</h1>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            AI-Powered CV is a cutting-edge application designed
                            to transform your resume with the power of AI. Our
                            platform allows you to upload your resume, anonymize
                            personal information, reformat it into a
                            professional layout, and enhance it with AI-driven
                            suggestions.
                        </p>
                    </CardContent>
                </Card>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                Anonymize personal information while retaining
                                professional details.
                            </li>
                            <li>
                                Reformat your resume into a consistent,
                                user-friendly layout.
                            </li>
                            <li>
                                Enhance your resume with AI-powered suggestions.
                            </li>
                            <li>
                                Export your polished resume in multiple formats.
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Our Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Our team is composed of experienced developers and
                            AI enthusiasts dedicated to helping you make your
                            career shine. We believe in the power of technology
                            to simplify and enhance the job application process.
                        </p>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center">
                    <Button asChild>
                        <a href="/home">Get Started</a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
