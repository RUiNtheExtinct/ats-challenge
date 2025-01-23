import "@testing-library/jest-dom";

export const ArrowRight = () => {
    return <div>lucide-react</div>;
};
export const Download = () => {
    return <div>lucide-react</div>;
};
export const Edit = () => {
    return <div>lucide-react</div>;
};
export const Upload = () => {
    return <div>lucide-react</div>;
};

const LucideReact = new Proxy(
    {},
    {
        get: function (_target, iconName: string) {
            // Return a mock React component for each icon
            return function MockedIcon(props: any) {
                return (
                    <svg {...props} data-testid={`lucide-icon-${iconName}`} />
                );
            };
        },
    },
);

jest.mock("lucide-react", () => {
    return LucideReact;
});

export default LucideReact;
