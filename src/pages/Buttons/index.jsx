import Button from '../../components/Button';
import styles from './Buttons.module.scss';
import { PlusCircle, Download, Trash2, Send, Star } from 'lucide-react';

function Buttons() {
    return (
        <div className={styles.container}>
            <h2 className={styles.showcaseTitle}>Button Component Showcase</h2>

            {/* === Section: Variants === */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Variants</h3>
                <div className={styles.row}>
                    <Button>Default</Button>
                    <Button primary>Primary</Button>
                    <Button bordered>Bordered</Button>
                    <Button danger>Danger</Button>
                </div>
            </div>

            {/* === Section: Sizes === */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Sizes</h3>
                <div className={styles.row}>
                    <Button primary size="small">Small</Button>
                    <Button primary size="medium">Medium</Button>
                    <Button primary size="large">Large</Button>
                </div>
            </div>

            {/* === Section: Shapes === */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Shapes</h3>
                <div className={styles.row}>
                    <Button primary rounded>Primary Rounded</Button>
                    <Button bordered rounded>Bordered Rounded</Button>
                    <Button danger rounded>Danger Rounded</Button>
                </div>
            </div>

            {/* === Section: With Icons === */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>With Icons</h3>
                <div className={styles.row}>
                    <Button primary leftIcon={<PlusCircle size={18} />}>
                        Thêm mới
                    </Button>
                    <Button bordered rightIcon={<Download size={18} />}>
                        Tải xuống
                    </Button>
                    <Button danger rounded leftIcon={<Trash2 size={18} />} />
                </div>
            </div>

            {/* === Section: States === */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>States</h3>
                <div className={styles.row}>
                    <Button primary disabled>Disabled</Button>
                    <Button primary rightIcon={<Send size={18} />}>
                        Đang gửi...
                    </Button>
                    <Button bordered loading>
                        Loading...
                    </Button>
                </div>
            </div>

            {/* === Section: As a Link === */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>As a Link</h3>
                <div className={styles.row}>
                    <Button
                        href="https://react.dev"
                        target="_blank"
                        primary
                        leftIcon={<Star size={18} />}
                    >
                        Go to React Docs
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Buttons;